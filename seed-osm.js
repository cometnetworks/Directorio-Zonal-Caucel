require('dotenv').config();
const axios = require('axios');
const db = require('./config/database'); // Ajusta la ruta si tu config está en otro lugar

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

// Bounding box de Caucel, Mérida (lat_s, lon_w, lat_n, lon_e)
const CAUCEL_BBOX = '20.9796,-89.7203,21.0084,-89.6885';

// Mapeo de etiquetas OSM a categorías locales
const OSM_TAGS_TO_CATEGORIES = {
	'shop=hairdresser': { name: 'Peluquería', icon: 'cut' },
	'shop=bakery': { name: 'Pastelería', icon: 'cake' },
	'shop=car_repair': { name: 'Taller Mecánico', icon: 'car-repair' },
	'shop=beauty': { name: 'Salón de Belleza', icon: 'spa' },
	'shop=hardware': { name: 'Ferretería', icon: 'hardware' },
	'amenity=dentist': { name: 'Dentista', icon: 'medical-services' },
	'amenity=clinic': { name: 'Clínica Médica', icon: 'medical-services' },
	'amenity=pharmacy': { name: 'Farmacia', icon: 'local-pharmacy' },
	'amenity=restaurant': { name: 'Restaurante', icon: 'restaurant' },
	'amenity=cafe': { name: 'Cafetería', icon: 'cafe' },
};

// Construye la consulta Overpass QL
function buildOverpassQuery() {
	const queries = Object.keys(OSM_TAGS_TO_CATEGORIES).map(tag => {
		const [key, value] = tag.split('=');
		return `node["${key}"="${value}"](${CAUCEL_BBOX});way["${key}"="${value}"](${CAUCEL_BBOX});`;
	});
	return `
		[out:json][timeout:30];
		(
			${queries.join('\n      ')}
		);
		out center;
	`;
}

// Asegura que las categorías existan y devuelve sus IDs
async function getCategoryIds() {
	const categoryIds = {};
	try {
		await db.query('BEGIN');
		for (const mapping of Object.values(OSM_TAGS_TO_CATEGORIES)) {
			const { name, icon } = mapping;
			let result = await db.query('SELECT id FROM categories WHERE name = $1', [name]);
			if (result.rows.length === 0) {
				result = await db.query(
					'INSERT INTO categories (name, icon_name) VALUES ($1, $2) RETURNING id',
					[name, icon]
				);
			}
			categoryIds[name] = result.rows[0].id;
		}
		await db.query('COMMIT');
		return categoryIds;
	} catch (error) {
		await db.query('ROLLBACK');
		throw error;
	}
}

// Script principal
async function seedFromOverpass() {
	let transactionStarted = false;
	try {
		const categoryIds = await getCategoryIds();
		const reverseCategoryMapping = Object.fromEntries(
			Object.entries(OSM_TAGS_TO_CATEGORIES).map(([tag, { name }]) => [tag, name])
		);

		const query = buildOverpassQuery();
		console.log('Consultando negocios en OSM...');
		const response = await axios.post(OVERPASS_API_URL, query, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		});
		const businesses = response.data.elements;
		if (!businesses.length) {
			console.log('No se encontraron negocios.');
			return;
		}

		await db.query('BEGIN');
		transactionStarted = true;
		let insertedCount = 0;

		for (const business of businesses) {
			const tags = business.tags;
			if (!tags || !tags.name) continue;

			const lat = business.lat || (business.center && business.center.lat);
			const lon = business.lon || (business.center && business.center.lon);
			if (!lat || !lon) continue;

			// Encuentra la categoría OSM
			const osmTag = Object.keys(tags)
				.map(k => `${k}=${tags[k]}`)
				.find(t => reverseCategoryMapping[t]);
			if (!osmTag) continue;

			const categoryName = reverseCategoryMapping[osmTag];
			const categoryId = categoryIds[categoryName];

			const insertQuery = `
				INSERT INTO businesses (name, description, category_id, location, address, phone, website, source, source_place_id)
				VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6, $7, $8, 'osm', $9)
				ON CONFLICT (source, source_place_id) DO NOTHING;
			`;

			const result = await db.query(insertQuery, [
				tags.name,
				tags.description || null,
				categoryId,
				lon,
				lat,
				tags['addr:full'] || tags['addr:street'] || null,
				tags.phone || tags['contact:phone'] || null,
				tags.website || tags['contact:website'] || null,
				business.id.toString(),
			]);
			if (result.rowCount > 0) insertedCount++;
		}

		await db.query('COMMIT');
		console.log(`Se insertaron ${insertedCount} negocios nuevos.`);
	} catch (error) {
		if (transactionStarted) await db.query('ROLLBACK');
		console.error('Error durante el seeding:', error.message);
	} finally {
		console.log('Script finalizado.');
	}
}

seedFromOverpass();

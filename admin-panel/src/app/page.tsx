import styles from './page.module.css';

// Define the type for a single business
interface Business {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  photos: string | null;
  is_featured: boolean;
  distance_m: string;
  lat: number;
  lng: number;
}

// Function to fetch businesses from the backend
async function getBusinesses(): Promise<Business[]> {
  try {
    // Using { cache: 'no-store' } to ensure fresh data on every request
    const res = await fetch('http://localhost:5500/api/v1/businesses?lat=20.994&lng=-89.7044', { cache: 'no-store' });
    console.log('Response:', res);
    console.log('res.ok:', res.ok);
    if (!res.ok) {
      // This will be caught by the nearest error boundary
      throw new Error('Failed to fetch businesses');
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    // In case of error, return an empty array to prevent the page from crashing
    return [];
  }
}

export default async function Home() {
  const businesses = await getBusinesses();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Directorio Zonal Caucel</h1>
        <p>Encuentra los mejores negocios locales.</p>
      </div>

      <div className={styles.grid}>
        {businesses.length > 0 ? (
          businesses.map((business) => (
            <div key={business.id} className={styles.card}>
              <h2>{business.name}</h2>
              <p>{business.address}</p>
              <p>Distancia: {business.distance_m} m</p>
              {business.phone && <p>Teléfono: {business.phone}</p>}
              {business.website && <p>Web: <a href={business.website}>{business.website}</a></p>}
            </div>
          ))
        ) : (
          <p>No se encontraron negocios. Asegúrate de que el backend esté funcionando y la base de datos tenga información.</p>
        )}
      </div>
    </main>
  );
}

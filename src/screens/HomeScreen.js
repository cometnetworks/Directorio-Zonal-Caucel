import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';

const CATEGORIES = [
  { id: 'Alimentos', label: 'Alimentos' },
  { id: 'Salud', label: 'Salud' },
  { id: 'Deporte', label: 'Deporte' },
  { id: 'Cafeterías', label: 'Cafeterías' },
];

const HomeScreen = ({ navigation }) => {
  const { favorites } = useFavorites();

  const handleOpenCategory = useCallback(
    (categoryId) => {
      navigation.navigate('BusinessListScreen', { category: categoryId });
    },
    [navigation],
  );

  const handleOpenSearch = useCallback(() => {
    navigation.navigate('SearchScreen');
  }, [navigation]);

  const handleOpenFavorites = useCallback(() => {
    navigation.navigate('Favoritos');
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Directorio Zonal Caucel</Text>
      <Text style={styles.title}>¿Qué estás buscando hoy?</Text>

      <TouchableOpacity style={styles.searchButton} onPress={handleOpenSearch}>
        <Text style={styles.searchButtonTitle}>🔍 Buscar negocios y servicios</Text>
        <Text style={styles.searchButtonSubtitle}>Encuentra establecimientos por nombre, categoría o dirección.</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categorías populares</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CategoriesScreen')}>
          <Text style={styles.sectionAction}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesGrid}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleOpenCategory(category.id)}
          >
            <Text style={styles.categoryLabel}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.favoritesCard}>
        <Text style={styles.favoritesTitle}>Tus favoritos</Text>
        <Text style={styles.favoritesDescription}>
          {favorites.length === 0
            ? 'Aún no tienes negocios guardados. Empieza a explorar y agrégalos a tu lista.'
            : `Tienes ${favorites.length} negocio${favorites.length === 1 ? '' : 's'} guardado${
                favorites.length === 1 ? '' : 's'
              } para acceder rápidamente a ellos.`}
        </Text>
        <TouchableOpacity style={styles.favoritesButton} onPress={handleOpenFavorites}>
          <Text style={styles.favoritesButtonText}>⭐ Ver Favoritos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    gap: 24,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
  },
  searchButton: {
    backgroundColor: '#1d4ed8',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    gap: 6,
  },
  searchButtonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  searchButtonSubtitle: {
    fontSize: 14,
    color: '#e0f2fe',
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flexBasis: '48%',
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  favoritesCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    gap: 12,
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  favoritesDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  favoritesButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fbbf24',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  favoritesButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#92400e',
  },
});

export default HomeScreen;

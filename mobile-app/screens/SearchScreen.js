import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import BusinessListScreen from './BusinessListScreen';
import { useFavorites } from '../context/FavoritesContext';

const normalizeText = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const SearchScreen = ({ businesses = [] }) => {
  const [query, setQuery] = useState('');
  const { favorites } = useFavorites();

  const filteredBusinesses = useMemo(() => {
    if (!query.trim()) {
      return businesses;
    }

    const normalizedQuery = normalizeText(query.trim());

    return businesses.filter((business) => {
      const name = normalizeText(business?.name ?? '');
      const category = normalizeText(business?.category ?? '');
      const address = normalizeText(business?.address ?? '');

      return [name, category, address].some((field) => field.includes(normalizedQuery));
    });
  }, [businesses, query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar negocios"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.searchInput}
      />

      <Text style={styles.favoritesSummary}>Favoritos guardados: {favorites.length}</Text>

      <BusinessListScreen businesses={filteredBusinesses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    marginBottom: 8,
  },
  favoritesSummary: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
});

export default SearchScreen;

import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MOCK_BUSINESSES } from './BusinessListScreen';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const filteredBusinesses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return MOCK_BUSINESSES;
    }

    return MOCK_BUSINESSES.filter((business) => {
      const haystack = `${business.name} ${business.category} ${business.address}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  const handleSelectBusiness = useCallback(
    (business) => {
      navigation.navigate('BusinessDetail', { business });
    },
    [navigation],
  );

  const renderResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      activeOpacity={0.8}
      onPress={() => handleSelectBusiness(item)}
    >
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultCategory}>{item.category}</Text>
      <Text style={styles.resultAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar negocios y servicios</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Escribe el nombre, categoría o dirección"
        placeholderTextColor="#9ca3af"
        style={styles.input}
      />

      <FlatList
        data={filteredBusinesses}
        keyExtractor={(item) => item.id}
        renderItem={renderResult}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.resultsContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No encontramos resultados que coincidan con tu búsqueda.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    color: '#111827',
  },
  resultsContainer: {
    paddingBottom: 24,
    gap: 12,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  resultName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  resultCategory: {
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#2563eb',
    marginBottom: 4,
  },
  resultAddress: {
    fontSize: 14,
    color: '#475569',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 32,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default SearchScreen;

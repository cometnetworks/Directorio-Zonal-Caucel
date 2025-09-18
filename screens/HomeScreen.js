import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CATEGORIES = [
  { id: 'papelerias', label: 'Papelerías' },
  { id: 'helados', label: 'Helados' },
  { id: 'refacciones', label: 'Refacciones' },
  { id: 'tortillerias', label: 'Tortillerías' },
  { id: 'cafeterias', label: 'Cafeterías' },
  { id: 'restaurantes', label: 'Restaurantes' },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>¿Qué estás buscando hoy?</Text>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar negocios o servicios"
        placeholderTextColor="#888"
        style={styles.searchInput}
      />

      <Text style={styles.sectionTitle}>Categorías</Text>
      <View style={styles.grid}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Text style={styles.categoryLabel}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favoritos</Text>
        <Text style={styles.placeholderText}>
          Pronto podrás acceder rápidamente a tus negocios favoritos desde esta
          sección.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '48%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 32,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;

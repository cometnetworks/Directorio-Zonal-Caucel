import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MOCK_BUSINESSES = [
  {
    id: '1',
    name: 'Panadería La Delicia',
    address: 'Calle 21 #145, Caucel',
    category: 'Alimentos',
  },
  {
    id: '2',
    name: 'Farmacia Caucel',
    address: 'Avenida 50 #210, Caucel',
    category: 'Salud',
  },
  {
    id: '3',
    name: 'Gimnasio Energía',
    address: 'Calle 31 #120, Caucel',
    category: 'Deporte',
  },
  {
    id: '4',
    name: 'Cafetería Aromas',
    address: 'Calle 19 #98, Caucel',
    category: 'Alimentos',
  },
  {
    id: '5',
    name: 'Clínica Dental Sonrisas',
    address: 'Calle 14 #56, Caucel',
    category: 'Salud',
  },
];

const BusinessListScreen = ({ route }) => {
  const category = route?.params?.category ?? null;

  const filteredBusinesses = useMemo(() => {
    if (!category) {
      return MOCK_BUSINESSES;
    }

    return MOCK_BUSINESSES.filter((business) => business.category === category);
  }, [category]);

  const renderBusiness = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {category ? `Negocios de ${category}` : 'Negocios disponibles'}
      </Text>

      <FlatList
        data={filteredBusinesses}
        keyExtractor={(item) => item.id}
        renderItem={renderBusiness}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay negocios en esta categoría.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f7a8c',
    textTransform: 'uppercase',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 32,
  },
});

export default BusinessListScreen;

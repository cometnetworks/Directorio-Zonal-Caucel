import React, { useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const MOCK_BUSINESSES = [
  {
    id: '1',
    name: 'Panadería La Delicia',
    address: 'Calle 21 #145, Caucel',
    category: 'Alimentos',
    phone: '+529991234567',
    latitude: 20.995841,
    longitude: -89.700327,
  },
  {
    id: '2',
    name: 'Farmacia Caucel',
    address: 'Avenida 50 #210, Caucel',
    category: 'Salud',
    phone: '+529985551234',
    latitude: 20.992314,
    longitude: -89.706784,
  },
  {
    id: '3',
    name: 'Gimnasio Energía',
    address: 'Calle 31 #120, Caucel',
    category: 'Deporte',
    phone: '+529991112233',
    latitude: 20.989476,
    longitude: -89.713245,
  },
  {
    id: '4',
    name: 'Cafetería Aromas',
    address: 'Calle 19 #98, Caucel',
    category: 'Alimentos',
    phone: '+529992224455',
    latitude: 20.987362,
    longitude: -89.704587,
  },
  {
    id: '5',
    name: 'Clínica Dental Sonrisas',
    address: 'Calle 14 #56, Caucel',
    category: 'Salud',
    phone: '+529984445566',
    latitude: 20.993874,
    longitude: -89.699131,
  },
];

const BusinessListScreen = ({ route, navigation }) => {
  const category = route?.params?.category ?? null;

  const filteredBusinesses = useMemo(() => {
    if (!category) {
      return MOCK_BUSINESSES;
    }

    return MOCK_BUSINESSES.filter((business) => business.category === category);
  }, [category]);

  const renderBusiness = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => navigation.navigate('BusinessDetail', { business: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    color: '#1f2933',
  },
  listContent: {
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111827',
  },
  address: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1d4ed8',
    textTransform: 'uppercase',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 32,
    fontSize: 14,
  },
});

export default BusinessListScreen;

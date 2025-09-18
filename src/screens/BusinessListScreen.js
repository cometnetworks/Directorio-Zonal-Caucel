import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const BUSINESSES = [
  {
    id: 'alimentos-1',
    name: 'Cafetería Aroma Maya',
    address: 'Calle 20 #145, Caucel',
    category: 'Alimentos y Bebidas',
    phone: '+529999876543',
  },
  {
    id: 'alimentos-2',
    name: 'Heladería Dulce Cielo',
    address: 'Av. 70 #210, Caucel',
    category: 'Alimentos y Bebidas',
    phone: '+529998765432',
  },
  {
    id: 'salud-1',
    name: 'Clínica Bienestar Caucel',
    address: 'Calle 31 #98, Caucel',
    category: 'Salud y Bienestar',
    phone: '+529997654321',
  },
  {
    id: 'salud-2',
    name: 'Farmacia Vida Plena',
    address: 'Calle 14 #56, Caucel',
    category: 'Salud y Bienestar',
    phone: '+529996543210',
  },
  {
    id: 'servicios-1',
    name: 'Consultoría Caucel Pro',
    address: 'Calle 19 #42, Caucel',
    category: 'Servicios Profesionales',
    phone: '+529995432109',
  },
  {
    id: 'servicios-2',
    name: 'Despacho Legal Caucel',
    address: 'Av. 60 #130, Caucel',
    category: 'Servicios Profesionales',
    phone: '+529994321098',
  },
  {
    id: 'educacion-1',
    name: 'Academia Brilla',
    address: 'Calle 18 #221, Caucel',
    category: 'Educación',
    phone: '+529993210987',
  },
  {
    id: 'educacion-2',
    name: 'Centro de Idiomas Caucel',
    address: 'Calle 15 #87, Caucel',
    category: 'Educación',
    phone: '+529992109876',
  },
  {
    id: 'hogar-1',
    name: 'Ferretería La Herramienta',
    address: 'Av. 65 #34, Caucel',
    category: 'Hogar y Mejoras',
    phone: '+529991098765',
  },
  {
    id: 'hogar-2',
    name: 'Decoraciones Casa Viva',
    address: 'Calle 24 #150, Caucel',
    category: 'Hogar y Mejoras',
    phone: '+529990987654',
  },
  {
    id: 'entretenimiento-1',
    name: 'CineClub Caucel',
    address: 'Calle 12 #45, Caucel',
    category: 'Entretenimiento',
    phone: '+529989876543',
  },
  {
    id: 'entretenimiento-2',
    name: 'Parque de Diversiones Caucel',
    address: 'Av. 30 #200, Caucel',
    category: 'Entretenimiento',
    phone: '+529988765432',
  },
  {
    id: 'automotriz-1',
    name: 'Taller Motor Max',
    address: 'Calle 40 #180, Caucel',
    category: 'Automotriz',
    phone: '+529987654321',
  },
  {
    id: 'automotriz-2',
    name: 'Refaccionaria Ruta 281',
    address: 'Calle 22 #78, Caucel',
    category: 'Automotriz',
    phone: '+529986543210',
  },
  {
    id: 'tecnologia-1',
    name: 'TechZone Caucel',
    address: 'Av. 59 #300, Caucel',
    category: 'Tecnología',
    phone: '+529985432109',
  },
  {
    id: 'tecnologia-2',
    name: 'Servicios IT Caucel',
    address: 'Calle 27 #66, Caucel',
    category: 'Tecnología',
    phone: '+529984321098',
  },
];

const BusinessListScreen = ({ route, navigation }) => {
  const category = route?.params?.category ?? null;

  const businesses = useMemo(() => {
    if (!category) {
      return BUSINESSES;
    }

    return BUSINESSES.filter((business) => business.category === category);
  }, [category]);

  const renderBusiness = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        {!category && <Text style={styles.category}>{item.category}</Text>}
      </View>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation?.navigate('BusinessDetail', { business: item })}
      >
        <Text style={styles.detailButtonText}>Ver detalle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {category ? `Negocios de ${category}` : 'Todos los negocios'}
      </Text>

      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id}
        renderItem={renderBusiness}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            No hay negocios registrados para esta categoría.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardInfo: {
    marginBottom: 12,
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  address: {
    fontSize: 14,
    color: '#475569',
  },
  category: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 32,
  },
});

export default BusinessListScreen;

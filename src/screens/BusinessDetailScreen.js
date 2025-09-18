import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusinessDetailScreen = ({ route }) => {
  const business = route?.params?.business ?? {};
  const { name, address, category, phone } = business;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name || 'Negocio sin nombre'}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Dirección</Text>
        <Text style={styles.value}>{address || 'No disponible'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.value}>{category || 'No disponible'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>{phone || 'No disponible'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#0f172a',
  },
});

export default BusinessDetailScreen;

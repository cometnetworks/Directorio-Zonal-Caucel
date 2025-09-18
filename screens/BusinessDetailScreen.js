import React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DUMMY_LATITUDE = 20.96737;
const DUMMY_LONGITUDE = -89.5925857;

const BusinessDetailScreen = ({ route }) => {
  const business = route?.params?.business ?? {};
  const { name, address, category, phone } = business;

  const handleOpenUrl = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('No se puede abrir el enlace', url);
      }
    } catch (error) {
      Alert.alert('Ocurrió un error al intentar abrir el enlace');
    }
  };

  const sanitizedPhone = phone ? phone.replace(/[^0-9+]/g, '') : '';
  const callUrl = sanitizedPhone ? `tel://${sanitizedPhone}` : null;
  const whatsappUrl = sanitizedPhone ? `https://wa.me/${sanitizedPhone.replace(/\+/g, '')}` : null;
  const mapsQuery = name ? encodeURIComponent(name) : `${DUMMY_LATITUDE},${DUMMY_LONGITUDE}`;
  const mapsUrl = `https://maps.google.com/?q=${mapsQuery}&ll=${DUMMY_LATITUDE},${DUMMY_LONGITUDE}`;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name || 'Nombre no disponible'}</Text>

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

      <View style={styles.actions}>
        {callUrl && (
          <TouchableOpacity style={styles.button} onPress={() => handleOpenUrl(callUrl)}>
            <Text style={styles.buttonText}>Llamar</Text>
          </TouchableOpacity>
        )}

        {whatsappUrl && (
          <TouchableOpacity style={styles.button} onPress={() => handleOpenUrl(whatsappUrl)}>
            <Text style={styles.buttonText}>WhatsApp</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={() => handleOpenUrl(mapsUrl)}>
          <Text style={styles.buttonText}>Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#222',
  },
  actions: {
    marginTop: 24,
    flexDirection: 'row',
    columnGap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default BusinessDetailScreen;

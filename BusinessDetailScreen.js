import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const BusinessDetailScreen = ({ route }) => {
  const { business } = route?.params ?? {};
  const latitude = business?.latitude != null ? Number(business.latitude) : null;
  const longitude = business?.longitude != null ? Number(business.longitude) : null;
  const hasValidLocation =
    typeof latitude === 'number' && !Number.isNaN(latitude) &&
    typeof longitude === 'number' && !Number.isNaN(longitude);

  const initialRegion = hasValidLocation
    ? {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
    : {
        latitude: 20.96737, // Mérida, as a general fallback
        longitude: -89.59259,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{business?.name ?? 'Negocio'}</Text>
      {hasValidLocation ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          scrollEnabled={false}
          zoomControlEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={business?.name}
            description={business?.address}
          />
        </MapView>
      ) : (
        <View style={[styles.map, styles.mapPlaceholder]}>
          <Text style={styles.placeholderText}>Ubicación no disponible</Text>
        </View>
      )}
      {business?.address ? (
        <Text style={styles.infoLabel}>Dirección:</Text>
      ) : null}
      {business?.address ? <Text style={styles.infoText}>{business.address}</Text> : null}
      {business?.phone ? (
        <>
          <Text style={styles.infoLabel}>Teléfono:</Text>
          <Text style={styles.infoText}>{business.phone}</Text>
        </>
      ) : null}
      {business?.description ? (
        <>
          <Text style={styles.infoLabel}>Descripción:</Text>
          <Text style={styles.infoText}>{business.description}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },
  map: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});

export default BusinessDetailScreen;

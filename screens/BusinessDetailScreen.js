import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const FALLBACK_REGION = {
  latitude: 20.96737,
  longitude: -89.59259,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const BusinessDetailScreen = ({ route }) => {
  const business = route?.params?.business ?? {};
  const { name, category, address, latitude, longitude, phone } = business;

  const coordinates = useMemo(() => {
    const parsedLat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
    const parsedLng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;

    if (
      typeof parsedLat === 'number' &&
      !Number.isNaN(parsedLat) &&
      typeof parsedLng === 'number' &&
      !Number.isNaN(parsedLng)
    ) {
      return {
        latitude: parsedLat,
        longitude: parsedLng,
      };
    }

    return null;
  }, [latitude, longitude]);

  const region = coordinates
    ? {
        ...coordinates,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : FALLBACK_REGION;

  const sanitizedPhone = useMemo(() => {
    if (!phone) {
      return '';
    }

    return String(phone).replace(/[^0-9+]/g, '');
  }, [phone]);

  const callUrl = sanitizedPhone ? `tel://${sanitizedPhone}` : null;
  const whatsappUrl = sanitizedPhone
    ? `https://wa.me/${sanitizedPhone.replace(/^\+/g, '')}`
    : null;
  const googleMapsUrl = coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`
    : null;

  const handleOpenUrl = useCallback(async (url, unavailableMessage) => {
    if (!url) {
      if (unavailableMessage) {
        Alert.alert('Acción no disponible', unavailableMessage);
      }
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('No se pudo abrir el enlace', url);
      }
    } catch (error) {
      Alert.alert('Ocurrió un problema al intentar abrir el enlace.');
    }
  }, []);

  const ActionButton = ({ label, emoji, url, unavailableMessage }) => {
    const enabled = Boolean(url);

    return (
      <TouchableOpacity
        activeOpacity={enabled ? 0.85 : 1}
        style={[styles.actionButton, !enabled && styles.actionButtonDisabled]}
        onPress={() => handleOpenUrl(url, unavailableMessage)}
        disabled={!enabled}
      >
        <Text style={styles.actionText}>
          {emoji} {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name || 'Nombre no disponible'}</Text>
        <Text style={styles.category}>
          {category || 'Categoría no disponible'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dirección</Text>
        <Text style={styles.sectionDescription}>{address || 'No disponible'}</Text>
      </View>

      <View style={styles.mapContainer}>
        {coordinates ? (
          <MapView
            style={styles.map}
            initialRegion={region}
            pointerEvents="none"
            scrollEnabled={false}
            rotateEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
          >
            <Marker coordinate={coordinates} title={name} description={address} />
          </MapView>
        ) : (
          <View style={[styles.map, styles.mapFallback]}>
            <Text style={styles.mapFallbackText}>Ubicación no disponible</Text>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <ActionButton
          emoji="📞"
          label="Llamar"
          url={callUrl}
          unavailableMessage="Este negocio no tiene un teléfono registrado."
        />
        <ActionButton
          emoji="💬"
          label="WhatsApp"
          url={whatsappUrl}
          unavailableMessage="No hay un número disponible para WhatsApp."
        />
        <ActionButton
          emoji="🗺️"
          label="Abrir en Google Maps"
          url={googleMapsUrl}
          unavailableMessage="No contamos con la ubicación de este negocio."
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2933',
  },
  category: {
    marginTop: 4,
    fontSize: 16,
    color: '#52606d',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  sectionDescription: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  mapContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  map: {
    width: '100%',
    height: 220,
  },
  mapFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
  },
  mapFallbackText: {
    color: '#475569',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BusinessDetailScreen;

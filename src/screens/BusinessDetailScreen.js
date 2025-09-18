import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';

const getBusinessId = (business) => business?.id ?? business?._id ?? business?.businessId ?? null;

const BusinessDetailScreen = ({ route }) => {
  const business = route?.params?.business ?? {};
  const { addFavorite, isFavorite } = useFavorites();

  const businessId = useMemo(() => getBusinessId(business), [business]);
  const saved = useMemo(() => (businessId ? isFavorite(businessId) : false), [businessId, isFavorite]);

  const handleSave = useCallback(() => {
    if (!business || !businessId) {
      return;
    }

    addFavorite(business);
  }, [addFavorite, business, businessId]);

  const name = business?.name ?? business?.nombre ?? 'Negocio sin nombre';
  const category = business?.category ?? business?.categoria ?? null;
  const address = business?.address ?? business?.direccion ?? null;
  const phone = business?.phone ?? business?.telefono ?? null;
  const description = business?.description ?? business?.descripcion ?? null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        {category ? <Text style={styles.category}>{category}</Text> : null}

        {address ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Dirección</Text>
            <Text style={styles.sectionValue}>{address}</Text>
          </View>
        ) : null}

        {phone ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Teléfono</Text>
            <Text style={styles.sectionValue}>{phone}</Text>
          </View>
        ) : null}

        {description ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Descripción</Text>
            <Text style={styles.sectionValue}>{description}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          accessibilityRole="button"
          style={[styles.favoriteButton, saved && styles.favoriteButtonDisabled]}
          onPress={handleSave}
          disabled={saved}
        >
          <Text style={[styles.favoriteButtonText, saved && styles.favoriteButtonTextDisabled]}>
            {saved ? '✔ Guardado en Favoritos' : '⭐ Guardar en Favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f1f5f9',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sectionValue: {
    fontSize: 15,
    color: '#0f172a',
    lineHeight: 22,
  },
  favoriteButton: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
  },
  favoriteButtonDisabled: {
    backgroundColor: '#e2e8f0',
  },
  favoriteButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#92400e',
  },
  favoriteButtonTextDisabled: {
    color: '#475569',
  },
});

export default BusinessDetailScreen;

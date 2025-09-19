import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';

const renderBusinessName = (business) => business?.name ?? business?.nombre ?? 'Negocio sin nombre';
const renderBusinessAddress = (business) => business?.address ?? business?.direccion ?? '';
const renderBusinessCategory = (business) => business?.category ?? business?.categoria ?? '';
const getBusinessId = (business) => business?.id ?? business?._id ?? business?.businessId ?? null;

const FavoritesScreen = ({ navigation }) => {
  const { favorites, removeFavorite, isLoading } = useFavorites();

  const listContentStyle = useMemo(
    () => (favorites.length === 0 ? styles.emptyListContent : styles.listContent),
    [favorites.length],
  );

  const keyExtractor = useCallback((item, index) => {
    const businessId = getBusinessId(item);
    if (businessId !== null && businessId !== undefined) {
      return String(businessId);
    }
    return `favorite-${index}`;
  }, []);

  const handleRemove = useCallback(
    (businessId) => {
      removeFavorite(businessId);
    },
    [removeFavorite],
  );

  const renderFavorite = useCallback(
    ({ item }) => {
      const businessId = getBusinessId(item);
      const name = renderBusinessName(item);
      const address = renderBusinessAddress(item);
      const category = renderBusinessCategory(item);

      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('BusinessDetail', { business: item })}
        >
          <View style={styles.cardInformation}>
            <Text style={styles.cardName}>{name}</Text>
            {category ? <Text style={styles.cardCategory}>{category}</Text> : null}
            {address ? <Text style={styles.cardAddress}>{address}</Text> : null}
          </View>

          {businessId ? (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => handleRemove(businessId)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Quitar</Text>
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
      );
    },
    [handleRemove, navigation],
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Sin favoritos todavía</Text>
        <Text style={styles.emptyDescription}>
          Guarda tus negocios preferidos para verlos aquí y acceder rápidamente a ellos.
        </Text>
      </View>
    ),
    [],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Cargando tus favoritos…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis negocios favoritos</Text>
        <Text style={styles.subtitle}>Consulta y gestiona los negocios que has guardado.</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={renderFavorite}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={listContentStyle}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardInformation: {
    flex: 1,
    paddingRight: 12,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2563eb',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 13,
    color: '#475569',
  },
  removeButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#ef4444',
  },
  removeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 15,
    color: '#475569',
  },
});

export default FavoritesScreen;

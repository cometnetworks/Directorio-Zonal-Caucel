import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@favorites_businesses';

const parseStoredFavorites = (storedValue) => {
  if (!storedValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('No se pudieron leer los favoritos almacenados.', error);
    return [];
  }
};

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      setFavorites(parseStoredFavorites(storedFavorites));
    } catch (error) {
      console.error('Error al cargar los favoritos', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadFavorites();
    }, [loadFavorites]),
  );

  const removeFavorite = useCallback(
    async (businessId) => {
      try {
        const updatedFavorites = favorites.filter((item) => item?.id !== businessId);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
      } catch (error) {
        console.error('No se pudo eliminar el negocio de favoritos', error);
      }
    },
    [favorites],
  );

  const confirmRemoveFavorite = useCallback(
    (business) => {
      Alert.alert(
        'Quitar de favoritos',
        `¿Deseas eliminar "${business?.name ?? business?.nombre ?? 'este negocio'}" de tus favoritos?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Quitar', style: 'destructive', onPress: () => removeFavorite(business?.id) },
        ],
        { cancelable: true },
      );
    },
    [removeFavorite],
  );

  const listContentStyle = useMemo(
    () => (favorites.length ? styles.listContent : styles.emptyListContent),
    [favorites.length],
  );

  const renderFavorite = useCallback(
    ({ item }) => {
      const name = item?.name ?? item?.nombre ?? 'Negocio sin nombre';
      const category = item?.category ?? item?.categoria;
      const address = item?.address ?? item?.direccion;

      return (
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{name}</Text>
            {category ? <Text style={styles.cardCategory}>{category}</Text> : null}
            {address ? <Text style={styles.cardAddress}>{address}</Text> : null}
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.removeButton}
            onPress={() => confirmRemoveFavorite(item)}
          >
            <Text style={styles.removeButtonText}>Quitar</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [confirmRemoveFavorite],
  );

  const keyExtractor = useCallback((item, index) => {
    if (item?.id != null) {
      return String(item.id);
    }
    return `favorite-${index}`;
  }, []);

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Sin favoritos todavía</Text>
        <Text style={styles.emptyDescription}>
          Guarda tus negocios preferidos para verlos aquí y acceder a ellos rápidamente.
        </Text>
      </View>
    ),
    [],
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007aff" />
          <Text style={styles.loadingText}>Cargando tus favoritos…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis negocios favoritos</Text>
        <Text style={styles.subtitle}>Consulta y gestiona los negocios que guardaste.</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e2e2',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6b6b6b',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyListContent: {
    flexGrow: 1,
    padding: 32,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    color: '#007aff',
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 13,
    color: '#6b6b6b',
  },
  removeButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b6b6b',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b6b6b',
  },
});

export default FavoritesScreen;

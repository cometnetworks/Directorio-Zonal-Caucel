import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

const BusinessListScreen = ({ businesses = [] }) => {
  const { addFavorite, isFavorite } = useFavorites();

  const handleSave = useCallback(
    (business) => {
      if (!business) {
        return;
      }
      addFavorite(business);
    },
    [addFavorite],
  );

  const renderBusiness = ({ item }) => {
    const saved = isFavorite(item?.id);

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.businessName}>{item?.name ?? 'Negocio sin nombre'}</Text>
          {item?.category ? <Text style={styles.businessCategory}>{item.category}</Text> : null}
          {item?.address ? <Text style={styles.businessAddress}>{item.address}</Text> : null}
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => handleSave(item)}
          style={[styles.saveButton, saved && styles.saveButtonDisabled]}
          disabled={saved}
        >
          <Text style={[styles.saveButtonText, saved && styles.saveButtonTextDisabled]}>
            {saved ? 'Guardado' : '⭐ Guardar'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const keyExtractor = (item, index) => {
    if (item?.id !== undefined && item?.id !== null) {
      return String(item.id);
    }
    return `business-${index}`;
  };

  return (
    <FlatList
      data={businesses}
      keyExtractor={keyExtractor}
      renderItem={renderBusiness}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={
        businesses.length === 0 ? [styles.listContent, styles.emptyListContent] : styles.listContent
      }
      ListEmptyComponent={<Text style={styles.emptyListText}>No hay negocios disponibles.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  separator: {
    height: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  businessCategory: {
    marginTop: 4,
    fontSize: 14,
    color: '#4b5563',
  },
  businessAddress: {
    marginTop: 2,
    fontSize: 13,
    color: '#6b7280',
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9999,
    backgroundColor: '#fbbf24',
  },
  saveButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  saveButtonTextDisabled: {
    color: '#6b7280',
  },
});

export default BusinessListScreen;

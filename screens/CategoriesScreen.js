import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CATEGORIES = [
  'Alimentos y Bebidas',
  'Salud y Bienestar',
  'Servicios Profesionales',
  'Educación',
  'Hogar y Mejoras',
  'Entretenimiento',
  'Automotriz',
  'Tecnología',
];

const CategoriesScreen = ({ navigation }) => {
  const handleCategoryPress = useCallback(
    (category) => {
      if (navigation && typeof navigation.navigate === 'function') {
        navigation.navigate('BusinessList', { category });
      }
    },
    [navigation]
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={styles.categoryLabel}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
  categoryButton: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  categoryLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CategoriesScreen;

import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';

// Importa tu logo
import logo from '../../assets/images/logo.png';

const CATEGORIES = [
  { id: 'Alimentos', label: 'Alimentos', icon: 'fast-food-outline' },
  { id: 'Salud', label: 'Salud', icon: 'medkit-outline' },
  { id: 'Deporte', label: 'Deporte', icon: 'barbell-outline' },
  { id: 'Cafeterías', label: 'Cafeterías', icon: 'cafe-outline' },
];

const HomeScreen = ({ navigation }) => {
  const { favorites } = useFavorites();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const colors = {
    background: isDark ? '#0f172a' : '#f8fafc',
    text: isDark ? '#f1f5f9' : '#0f172a',
    subtitle: isDark ? '#cbd5e1' : '#475569',
    card: isDark ? '#1e293b' : '#ffffff',
    border: isDark ? '#334155' : '#e2e8f0',
    button: '#fbbf24',
    buttonText: '#92400e',
  };

  const handleOpenCategory = useCallback(
    (categoryId) => {
      navigation.navigate('BusinessListScreen', { category: categoryId });
    },
    [navigation],
  );

  const handleOpenSearch = useCallback(() => {
    navigation.navigate('SearchScreen');
  }, [navigation]);

  const handleOpenFavorites = useCallback(() => {
    navigation.navigate('FavoritesScreen');
  }, [navigation]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Toggle Dark/Light */}
      <View style={styles.themeToggle}>
        <Text style={{ color: colors.text, marginRight: 8 }}>
          {isDark ? 'Dark' : 'Light'}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: '#d1d5db', true: '#60a5fa' }}
          thumbColor={isDark ? '#2563eb' : '#2563eb'} // azul visible en ambos modos
        />
      </View>

      {/* Banner azul con logo */}
      <View style={styles.banner}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.bannerText}>Encuentra negocios cerca de ti</Text>
      </View>

      {/* Botón de búsqueda */}
      <TouchableOpacity style={styles.searchButton} onPress={handleOpenSearch}>
        <Ionicons name="search-outline" size={22} color="#fff" />
        <View style={{ flex: 1 }}>
          <Text style={styles.searchButtonTitle}>Buscar negocios y servicios</Text>
          <Text
            style={styles.searchButtonSubtitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Encuentra establecimientos por nombre, categoría o dirección.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Categorías */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Categorías populares
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CategoriesScreen')}>
          <Text style={{ color: '#2563eb', fontWeight: '600' }}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesGrid}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => handleOpenCategory(category.id)}
          >
            <Ionicons name={category.icon} size={28} color="#2563eb" />
            <Text style={[styles.categoryLabel, { color: colors.text }]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Favoritos */}
      <View
        style={[
          styles.favoritesCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.favoritesTitle, { color: colors.text }]}>
          Tus favoritos
        </Text>
        <Text style={[styles.favoritesDescription, { color: colors.subtitle }]}>
          {favorites.length === 0
            ? 'Aún no tienes negocios guardados. Empieza a explorar y agrégalos a tu lista.'
            : `Tienes ${favorites.length} negocio${favorites.length === 1 ? '' : 's'} guardado${
                favorites.length === 1 ? '' : 's'
              } para acceder rápidamente a ellos.`}
        </Text>
        <TouchableOpacity
          style={[styles.favoritesButton, { backgroundColor: colors.button }]}
          onPress={handleOpenFavorites}
        >
          <Text style={[styles.favoritesButtonText, { color: colors.buttonText }]}>
            ⭐ Ver Favoritos
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
  },
  banner: {
    width: '100%',
    backgroundColor: '#2563eb', // azul unificado
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    marginBottom: 20,
    borderRadius: 24, // redondeado en todas las esquinas
  },
  logo: {
    width: 250, // más grande
    height: 120,
    marginBottom: 12,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb', // mismo azul que banner
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  searchButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  searchButtonSubtitle: {
    fontSize: 12,
    color: '#e0f2fe',
    lineHeight: 16,
    flexShrink: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  categoryCard: {
    flexBasis: '47%',
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 8,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  favoritesCard: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 40,
    gap: 12,
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  favoritesDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  favoritesButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  favoritesButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default HomeScreen;

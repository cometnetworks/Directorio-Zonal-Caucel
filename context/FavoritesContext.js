import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@directorio_caucel_favorites';

const FavoritesContext = createContext(undefined);

const parseStoredFavorites = (rawValue) => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('No se pudieron leer los favoritos almacenados.', error);
    return [];
  }
};

const getBusinessId = (business) => business?.id ?? business?._id ?? business?.businessId ?? null;

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        setFavorites(parseStoredFavorites(storedValue));
      } catch (error) {
        console.error('Error al cargar los favoritos almacenados', error);
      } finally {
        setIsHydrated(true);
      }
    };

    void loadFavorites();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const persistFavorites = async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('No se pudo guardar el listado de favoritos', error);
      }
    };

    void persistFavorites();
  }, [favorites, isHydrated]);

  const addFavorite = useCallback((business) => {
    const businessId = getBusinessId(business);

    if (!businessId) {
      return;
    }

    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => getBusinessId(item) === businessId);
      if (exists) {
        return prevFavorites;
      }
      return [...prevFavorites, business];
    });
  }, []);

  const removeFavorite = useCallback((businessId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => getBusinessId(item) !== businessId),
    );
  }, []);

  const value = useMemo(() => {
    const favoriteIds = new Set(favorites.map((item) => getBusinessId(item)).filter(Boolean));

    const isFavoriteById = (businessId) => favoriteIds.has(businessId);

    return {
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite: isFavoriteById,
      isLoading: !isHydrated,
    };
  }, [favorites, isHydrated, addFavorite, removeFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites debe utilizarse dentro de un FavoritesProvider');
  }

  return context;
};

export default FavoritesContext;

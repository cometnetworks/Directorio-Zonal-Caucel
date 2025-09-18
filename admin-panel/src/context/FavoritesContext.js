"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "@favorites";

const memoryStorage = new Map();

const createFallbackAsyncStorage = () => ({
  async getItem(key) {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return memoryStorage.has(key) ? memoryStorage.get(key) : null;
  },
  async setItem(key, value) {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
    memoryStorage.set(key, value);
  },
  async removeItem(key) {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(key);
      return;
    }
    memoryStorage.delete(key);
  },
});

const AsyncStorage =
  typeof globalThis !== "undefined" &&
  globalThis.AsyncStorage &&
  typeof globalThis.AsyncStorage.getItem === "function" &&
  typeof globalThis.AsyncStorage.setItem === "function"
    ? globalThis.AsyncStorage
    : createFallbackAsyncStorage();

const FavoritesContext = createContext(undefined);

const getFavoriteKey = (item) => {
  if (item == null) {
    return null;
  }

  if (typeof item === "object") {
    if ("id" in item && item.id != null) {
      return String(item.id);
    }
    if ("_id" in item && item._id != null) {
      return String(item._id);
    }
    try {
      return JSON.stringify(item);
    } catch (error) {
      console.error("No se pudo serializar el elemento favorito", error);
      return null;
    }
  }

  return String(item);
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
        if (!isMounted || !storedFavorites) {
          return;
        }

        const parsed = JSON.parse(storedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch (error) {
        console.error("Error al cargar favoritos desde AsyncStorage", error);
      } finally {
        if (isMounted) {
          setHydrated(true);
        }
      }
    };

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const persistFavorites = async () => {
      try {
        const serialized = JSON.stringify(favorites);
        await AsyncStorage.setItem(STORAGE_KEY, serialized);
      } catch (error) {
        console.error("Error al guardar favoritos en AsyncStorage", error);
      }
    };

    void persistFavorites();
  }, [favorites, hydrated]);

  const addFavorite = useCallback((favorite) => {
    if (favorite == null) {
      return;
    }

    setFavorites((prevFavorites) => {
      const key = getFavoriteKey(favorite);

      if (key == null) {
        return prevFavorites.some((item) => item === favorite)
          ? prevFavorites
          : [...prevFavorites, favorite];
      }

      const exists = prevFavorites.some((item) => getFavoriteKey(item) === key);
      if (exists) {
        return prevFavorites;
      }

      return [...prevFavorites, favorite];
    });
  }, []);

  const removeFavorite = useCallback((favoriteOrId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.length === 0) {
        return prevFavorites;
      }

      const key = getFavoriteKey(favoriteOrId);

      if (key == null) {
        return prevFavorites.filter((item) => item !== favoriteOrId);
      }

      return prevFavorites.filter((item) => getFavoriteKey(item) !== key);
    });
  }, []);

  const isFavorite = useCallback(
    (favoriteOrId) => {
      if (favorites.length === 0) {
        return false;
      }

      const key = getFavoriteKey(favoriteOrId);

      if (key == null) {
        return favorites.some((item) => item === favoriteOrId);
      }

      return favorites.some((item) => getFavoriteKey(item) === key);
    },
    [favorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      hydrated,
    }),
    [favorites, addFavorite, removeFavorite, isFavorite, hydrated]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }
  return context;
}

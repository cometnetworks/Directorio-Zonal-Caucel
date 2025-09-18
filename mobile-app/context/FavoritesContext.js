import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const FavoritesContext = createContext(undefined);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = useCallback((business) => {
    if (!business || !business.id) {
      return;
    }

    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === business.id);
      if (exists) {
        return prevFavorites;
      }
      return [...prevFavorites, business];
    });
  }, []);

  const removeFavorite = useCallback((businessId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== businessId));
  }, []);

  const isFavorite = useCallback(
    (businessId) => favorites.some((item) => item.id === businessId),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, addFavorite, removeFavorite, isFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};

export default FavoritesContext;

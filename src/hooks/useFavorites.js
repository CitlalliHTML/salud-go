import { useState, useEffect } from 'react';

export const useFavorites = () => {
  // 1. Cargar favoritos iniciales desde localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('saludgo_favs');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Guardar en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('saludgo_favs', JSON.stringify(favorites));
  }, [favorites]);

  // 3. Función para agregar o quitar (Toggle)
  const toggleFavorite = (place) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === place.id);
      if (isFavorite) {
        // Si ya está, lo quitamos
        return prev.filter((fav) => fav.id !== place.id);
      } else {
        // Si no está, lo agregamos
        return [...prev, place];
      }
    });
  };

  const clearAll = () => setFavorites([]);

  return { favorites, toggleFavorite, clearAll };
};
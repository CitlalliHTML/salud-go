import React from 'react';
import { FaArrowLeft, FaHeart, FaTrashAlt } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites';
import FavoriteCard from '../components/FavoriteCard';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

const FavoritesPage = () => {
  const { favorites, toggleFavorite, clearAll } = useFavorites();
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
    <div className="min-h-screen bg-gray-50">
      {/* Header con Degradado SaludGo */}
      <header className="bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] text-white p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          <button 
      onClick={() => navigate('/home')} // O navigate(-1) para volver a la anterior
      className="p-2 rounded-lg hover:bg-gray-100"
    >
      <FaArrowLeft size={20} /> Volver
    </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-white/20 p-5 rounded-2xl backdrop-blur-sm">
                <FaHeart className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Mis Favoritos</h1>
                <p className="text-gray-300 mt-1">
                  {favorites.length} {favorites.length === 1 ? 'establecimiento guardado' : 'establecimientos guardados'}
                </p>
                <p className="text-sm text-gray-400 mt-2">Accede rápidamente a tus clínicas y farmacias favoritas</p>
              </div>
            </div>

            {favorites.length > 0 && (
              <button 
                onClick={clearAll}
                className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600 text-white px-6 py-3 rounded-xl self-start transition-all"
              >
                <FaTrashAlt /> Limpiar todo
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Grid de Favoritos */}
      <main className="max-w-6xl mx-auto p-8">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((place) => (
              <FavoriteCard 
                key={place.id} 
                item={place} 
                onRemove={toggleFavorite} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg italic">Aún no tienes establecimientos guardados.</p>
          </div>
        )}
      </main>
    </div>
    </div>
    </AnimatedPage>
  );
};

export default FavoritesPage;
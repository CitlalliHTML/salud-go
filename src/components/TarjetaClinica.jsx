import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineLocationMarker, 
  HiOutlinePhone, 
  HiStar, 
  HiOutlineHeart,
  HiHeart 
} from "react-icons/hi";
import { useFavorites } from '../hooks/useFavorites';
import { IoNavigateOutline } from "react-icons/io5";
import { MdOutlineLocalHospital } from "react-icons/md";

const TarjetaClinica = ({ clinica }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  if (!clinica) return null;

  const {
    id,
    nombre,
    imagen,
    puntuacion,
    resenas,
    direccion,
    distancia,
    telefono,
    servicios = [],
    abierto
  } = clinica;

  const isFav = favorites.some(f => f.id === id);

  // FUNCIÓN CORREGIDA: Extrae coordenadas antes de navegar
  const verDetalles = (e) => {
    // Evitamos que el clic en el botón de favorito active la navegación
    if (e.target.closest('.btn-fav')) return;

    // Extraemos lat y lng del objeto geometry de Google o de la raíz
    // Google Places suele devolver funciones .lat() y .lng()
    const latitude = clinica.geometry?.location?.lat 
      ? (typeof clinica.geometry.location.lat === 'function' ? clinica.geometry.location.lat() : clinica.geometry.location.lat)
      : clinica.lat;

    const longitude = clinica.geometry?.location?.lng 
      ? (typeof clinica.geometry.location.lng === 'function' ? clinica.geometry.location.lng() : clinica.geometry.location.lng)
      : clinica.lng;

    // Enviamos el objeto 'clinica' enriquecido con lat y lng al state
    navigate(`/clinica/${id}`, { 
      state: { 
        ...clinica, 
        lat: latitude, 
        lng: longitude 
      } 
    });
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(clinica);
  };

  return (
    <div
      onClick={verDetalles} 
      className="bg-white rounded-[2.5rem] shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
    >
      {/* IMAGEN Y BADGES */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imagen} 
          alt={nombre} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <button 
          onClick={handleToggleFavorite}
          className={`btn-fav absolute top-4 right-16 p-2 rounded-full shadow-md transition-all z-10 ${
            isFav ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-500'
          }`}
        >
          {isFav ? <HiHeart size={20} /> : <HiOutlineHeart size={20} />}
        </button>

        <div className="absolute top-4 right-4 bg-[#1e3d47] text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold shadow-lg">
          <MdOutlineLocalHospital /> Clínica
        </div>

        {abierto && (
          <div className="absolute bottom-4 left-4 bg-emerald-100/90 backdrop-blur-sm text-emerald-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold border border-emerald-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Abierto ahora
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{nombre}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-orange-50 px-2 py-1 rounded-lg">
              <HiStar className="text-orange-400" />
              <span className="text-orange-700 font-bold text-sm">{puntuacion}</span>
              <span className="text-gray-400 text-xs">({resenas} reseñas)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-2xl">
            <HiOutlineLocationMarker className="text-[#4a707a] mt-1 shrink-0" />
            <div className="text-xs">
              <p className="text-gray-700 font-medium">{direccion}</p>
              <p className="text-gray-400 flex items-center gap-1">
                <IoNavigateOutline size={10} /> {distancia}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl text-xs">
            <HiOutlinePhone className="text-[#4a707a] shrink-0" />
            <span className="text-gray-700 font-medium">{telefono || "Sin teléfono"}</span>
          </div>
        </div>

        {/* SERVICIOS */}
        <div className="flex flex-wrap gap-2">
          {servicios.slice(0, 3).map((s, i) => (
            <span key={i} className="bg-[#f0f9fa] text-[#4a707a] px-3 py-1 rounded-lg text-[10px] font-bold border border-[#e0f2f4]">
              {s}
            </span>
          ))}
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex gap-3 pt-2">
          <button 
            onClick={(e) => { e.stopPropagation(); /* lógica llamar */ }}
            className="flex-1 bg-[#4a707a] hover:bg-[#3d5c64] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-sm"
          >
            <HiOutlinePhone /> Llamar
          </button>
          <button 
            onClick={verDetalles}
            className="flex-1 border-2 border-[#4a707a] text-[#4a707a] hover:bg-gray-50 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
          >
            <IoNavigateOutline /> Ruta
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaClinica;
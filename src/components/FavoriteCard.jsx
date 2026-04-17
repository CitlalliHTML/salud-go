import React from 'react';
import { FaStar, FaPhoneAlt, FaRegPaperPlane, FaHeart, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const FavoriteCard = ({ item, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 max-w-sm">
      {/* Imagen y Tags */}
      <div className="relative h-48">
        <img src={item.image} alt={item.nombre} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-slate-800/80 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
          <FaPhoneAlt size={10} /> {item.tipo}
        </div>
        <button 
          onClick={() => onRemove(item)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 shadow-sm hover:scale-110 transition-transform"
        >
          <FaHeart />
        </button>
        <div className="absolute bottom-3 left-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Abierto
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{item.nombre}</h3>
        <div className="flex items-center gap-1 mt-1 text-orange-400">
          <FaStar /> <span className="font-bold text-gray-700">{item.rating}</span>
          <span className="text-gray-400 text-sm font-normal">({item.reviews})</span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-gray-300"/> {item.direccion}</p>
          <p className="flex items-center gap-2"><FaClock className="text-gray-300"/> {item.horario}</p>
          <p className="flex items-center gap-2"><FaPhoneAlt className="text-gray-300"/> {item.telefono}</p>
        </div>

        {/* Botones de Acción */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button className="flex items-center justify-center gap-2 bg-slate-500 hover:bg-slate-600 text-white py-2 rounded-xl transition-colors">
            <FaPhoneAlt /> Llamar
          </button>
          <button className="flex items-center justify-center gap-2 border border-slate-300 text-slate-600 hover:bg-slate-50 py-2 rounded-xl transition-colors">
            <FaRegPaperPlane /> Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
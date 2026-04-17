import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiStar, HiOutlineClock, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineLocalHospital } from "react-icons/md";
import { useFavorites } from '../hooks/useFavorites';
import { FaHeart } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage';
import DarkModeToggle from '../components/DarkModeToggle';

// Importaciones de Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css';

// --- DATOS SIMULADOS (Añadidos para SaludGo) ---
const RESENAS_SIMULADAS = [
  {
    id: 1,
    nombre_usuario: "Valeria García",
    comentario: "Excelente atención, los doctores son muy profesionales y las instalaciones están impecables.",
    estrellas: 5,
    fecha: "2026-03-15"
  },
  {
    id: 2,
    nombre_usuario: "Juan Pedro",
    comentario: "La espera fue un poco larga, pero el trato médico valió la pena. Muy recomendados.",
    estrellas: 4,
    fecha: "2026-04-01"
  },
  {
    id: 3,
    nombre_usuario: "Mónica S.",
    comentario: "Me ayudaron mucho con mi tratamiento. El proceso de citas es muy ágil.",
    estrellas: 5,
    fecha: "2026-04-10"
  }
];

// 1. COMPONENTE DE RUTAS
const Routing = ({ userPos, clinicaPos }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userPos || !clinicaPos || !clinicaPos[0]) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userPos[0], userPos[1]),
        L.latLng(clinicaPos[0], clinicaPos[1])
      ],
      lineOptions: {
        styles: [{ color: "#2c5d6d", weight: 6, opacity: 0.8 }]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false 
    }).addTo(map);

    return () => {
      try {
        if (map && routingControl) map.removeControl(routingControl);
      } catch (e) {
        console.warn("Limpieza de mapa evitada");
      }
    };
  }, [map, userPos, clinicaPos]);

  return null;
};

// Fix para iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DetalleClinica = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state;
  const { favorites, toggleFavorite } = useFavorites();
  
  const [userLocation, setUserLocation] = useState(null);
  const [comentario, setComentario] = useState("");
  const [estrellas, setEstrellas] = useState(5);
  // Inicializamos con los datos simulados
  const [resenasReales, setResenasReales] = useState(RESENAS_SIMULADAS);

  useEffect(() => {
    // Ya no llamamos a obtenerResenas() para evitar errores de servidor
    
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => console.warn("Ubicación no permitida"),
      { enableHighAccuracy: true }
    );
  }, [info?.id]);

  const enviarResena = (e) => {
    e.preventDefault();
    alert("¡Gracias! Tu reseña se ha enviado (Modo Demo para UTOM)");
    setComentario("");
  };

  if (!info) return <div className="p-10 text-center">No hay información.</div>;

  const getSafeCoord = (type) => {
    const geo = info.geometry?.location;
    if (!geo) return info[type];
    return typeof geo[type] === 'function' ? geo[type]() : geo[type];
  };

  const lat = getSafeCoord('lat');
  const lng = getSafeCoord('lng');
  const isFavorite = favorites.some((fav) => fav.id === info.id);

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        {/* HEADER / BANNER */}
        <div className="relative h-[450px] w-full overflow-hidden">
          <img src={info.imagen} alt={info.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="bg-white p-3 rounded-2xl shadow-xl text-gray-700 hover:scale-105 transition-transform">
              <HiOutlineArrowLeft size={22} />
            </button>
            
            <div className="flex items-center gap-4">
              <button onClick={() => toggleFavorite(info)} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-md ${isFavorite ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-white text-gray-400'}`}>
                <FaHeart className={isFavorite ? 'text-red-500' : 'text-gray-300'} />
                {isFavorite ? 'Guardado' : 'Añadir a Favoritos'}
              </button>
              {/* UBICACIÓN CORRECTA DEL TOGGLE */}
              <DarkModeToggle />
            </div>
          </div>
          
          <div className="absolute bottom-12 left-8 right-8 text-white text-center md:text-left">
            <h1 className="text-5xl font-medium mb-4 drop-shadow-lg">{info.nombre}</h1>
            <div className="flex justify-center md:justify-start items-center gap-6">
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/30">
                <HiStar className="text-yellow-400" />
                <span className="font-bold">{info.puntuacion}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">Sobre nosotros</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xl max-w-4xl">
              Bienvenido a {info.nombre}. Comprometidos con tu bienestar y salud en Michoacán.
            </p>
          </section>

          <div className="flex flex-col md:flex-row gap-8 mb-16 items-stretch">
            {/* LADO IZQUIERDO: EL MAPA */}
            <div className="w-full md:w-2/3 h-[500px] bg-white dark:bg-slate-900 p-4 rounded-[3rem] shadow-xl border border-gray-100 dark:border-slate-800">
               <div className="h-full w-full rounded-[2.5rem] overflow-hidden relative z-0">
                  {lat && lng ? (
                    <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={[lat, lng]}><Popup>{info.nombre}</Popup></Marker>
                      {userLocation && <Routing userPos={userLocation} clinicaPos={[lat, lng]} />}
                    </MapContainer>
                  ) : <p className="flex items-center justify-center h-full dark:text-white">Cargando mapa...</p>}
               </div>
            </div>

            {/* LADO DERECHO: INFO DE CONTACTO */}
            <div className="w-full md:w-1/3">
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-8 border border-gray-50 dark:border-slate-800 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">Contacto</h2>
                <div className="space-y-8 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-300"><HiOutlineClock size={24}/></div>
                    <div><p className="font-bold dark:text-white">Horario</p><p className="text-gray-500 dark:text-gray-400">Lun-Vie: 8:00-20:00</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-2xl text-green-600 dark:text-green-300"><HiOutlinePhone size={24}/></div>
                    <div><p className="font-bold dark:text-white">Teléfono</p><p className="text-gray-500 dark:text-gray-400">{info.telefono || "+52 447 123 4567"}</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-300"><HiOutlineLocationMarker size={24}/></div>
                    <div><p className="font-bold dark:text-white">Dirección</p><p className="text-gray-500 dark:text-gray-400 text-sm">{info.direccion}</p></div>
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  <button className="w-full bg-[#2c5d6d] text-white py-4 rounded-2xl font-bold hover:bg-[#1e414d] transition-all">Llamar ahora</button>
                  <button className="w-full border-2 border-[#2c5d6d] text-[#2c5d6d] dark:text-cyan-400 dark:border-cyan-400 py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">Cómo llegar</button>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN RESEÑAS SIMULADAS */}
          <section className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 dark:text-white">Reseñas de la comunidad</h3>
            <form onSubmit={enviarResena} className="mb-10 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-md border border-gray-100 dark:border-slate-800">
              <textarea 
                value={comentario} 
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu opinión aquí..."
                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-[#2c5d6d] mb-4 dark:text-white"
                required 
              />
              <div className="flex justify-between items-center">
                <select value={estrellas} onChange={(e) => setEstrellas(e.target.value)} className="bg-gray-50 dark:bg-slate-800 p-2 rounded-xl border-none dark:text-white">
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
                <button type="submit" className="bg-[#2c5d6d] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#1e414d]">Publicar</button>
              </div>
            </form>

            <div className="space-y-4">
              {resenasReales.map((res) => (
                <div key={res.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[#2c5d6d] dark:text-cyan-400">{res.nombre_usuario}</span>
                    <span className="text-yellow-500">{"⭐".repeat(res.estrellas)}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{res.comentario}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default DetalleClinica;
import React, { useState, useEffect } from 'react';
import { 
  HiOutlineSearch, HiOutlineLocationMarker, HiHeart, 
  HiOutlineLogin, HiOutlineFilter 
} from "react-icons/hi";
import { IoMedical } from "react-icons/io5";
import { MdOutlineLocalHospital, MdOutlineLocalPharmacy } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import TarjetaClinica from '../components/TarjetaClinica';
import { useNavigate } from 'react-router-dom'; // 1. Importa el hook
import AnimatedPage from '../components/AnimatedPage';
import DarkModeToggle from '../components/DarkModeToggle'; //implementacion modo obscuro

const Home = () => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Todos');
  const [clinicasData, setClinicasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [municipio, setMunicipio] = useState('Maravatío');
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const navigate = useNavigate(); // 2. Inicializa el navegador

  const municipiosOriente = [
    "Maravatío", "Ciudad Hidalgo", "Zitácuaro", "Tlalpujahua", 
    "Senguio", "Angangueo", "Irimbo", "Epitacio Huerta"
  ];

  const serviciosLista = [
    "Medicina General", "Pediatría", "Urgencias", 
    "Traumatología", "Cardiología", "Odontología", 
    "Análisis clínicos", "Vacunación"
  ];

  const toggleServicio = (serv) => {
    setServiciosSeleccionados(prev => 
      prev.includes(serv) ? prev.filter(s => s !== serv) : [...prev, serv]
    );

  };

  useEffect(() => {
    const cargarDatos = () => {
      if (!window.google) return;
      setLoading(true);
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      
      let keyword = `health ${municipio}`;
      if (tipoSeleccionado === 'Clinicas') keyword = `hospital clinic ${municipio}`;
      if (tipoSeleccionado === 'Farmacias') keyword = `pharmacy ${municipio}`;
      if (busqueda) keyword = `${busqueda} ${municipio}`;

      const request = {
        query: keyword,
        // IMPORTANTE: Aseguramos que pedimos 'geometry'
        fields: ['name', 'geometry', 'rating', 'formatted_address', 'photos', 'opening_hours', 'user_ratings_total', 'place_id'],
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const transformed = results.map((place, index) => {
            
            // --- CORRECCIÓN CRÍTICA AQUÍ ---
            // Extraemos lat y lng como números reales ejecutando las funciones de Google
            const latVal = place.geometry?.location?.lat() || null;
            const lngVal = place.geometry?.location?.lng() || null;

            return {
              id: place.place_id || index,
              nombre: place.name,
              imagen: place.photos ? place.photos[0].getUrl({ maxWidth: 500 }) : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500",
              puntuacion: place.rating || 0,
              resenas: place.user_ratings_total || 0,
              direccion: place.formatted_address,
              distancia: "Cerca de ti",
              // Guardamos las coordenadas limpias para que TarjetaClinica las reciba bien
              lat: latVal,
              lng: lngVal,
              horario: place.opening_hours?.isOpen() ? "Abierto ahora" : "Cerrado",
              abierto: place.opening_hours?.isOpen() || false,
              servicios: index % 2 === 0 ? ["Medicina General", "Urgencias"] : ["Farmacia", "Pediatría"]
            };
          });

          const filtrados = serviciosSeleccionados.length > 0 
            ? transformed.filter(c => serviciosSeleccionados.some(s => c.servicios.includes(s)))
            : transformed;

          setClinicasData(filtrados);
        } else {
          setClinicasData([]);
        }
        setLoading(false);
      });
    };

    if (window.google) cargarDatos();
  }, [tipoSeleccionado, busqueda, municipio, serviciosSeleccionados]);

  return (
  <AnimatedPage>
     <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="bg-gradient-to-r from-[#2c5d6d] to-[#1e3d47] text-white pt-12 pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/30">
              <IoMedical className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">SaludGo</h1>
              <p className="text-sm opacity-90 italic">✨ Tu salud en Michoacán</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
      onClick={() => navigate('/favoritespage')} // 3. Agrega la navegación
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/20 transition-all text-sm font-medium"
    >
      <HiHeart className="text-lg" /> Favoritos
    </button>
           <button 
    onClick={() => navigate('/perfilusuario')} 
    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-1.5 pr-4 rounded-xl border border-white/20 transition-all text-sm font-medium group"
  >
    {/* Avatar pequeño para que se vea más profesional */}
    <div className="w-7 h-7 rounded-lg bg-[#4a707a] flex items-center justify-center border border-white/30 overflow-hidden">
      <img 
        src="https://randomuser.me/api/portraits/women/44.jpg" 
        alt="User" 
        className="w-full h-full object-cover"
      />
    </div>
    <span className="group-hover:text-white transition-colors">Mi Perfil</span>
  </button>
  <DarkModeToggle />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6">
          <p className="text-lg opacity-90 max-w-2xl">
            Explora servicios de salud en <strong>{municipio}</strong> y la Región Oriente.
          </p>
        </div>

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-3 flex flex-col md:flex-row gap-2 border border-gray-100">
            <div className="flex-[2] flex items-center gap-3 px-4 py-4 bg-[#f8fafc] rounded-2xl border border-gray-200 focus-within:border-[#4a707a] transition-all">
              <HiOutlineSearch className="text-gray-400 text-xl" />
              <input 
                type="text" 
                placeholder="¿Qué estás buscando?" 
                className="bg-transparent w-full outline-none text-gray-700" 
                onKeyDown={(e) => e.key === 'Enter' && setBusqueda(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-4 bg-[#f8fafc] rounded-2xl border border-gray-200">
              <HiOutlineLocationMarker className="text-[#4a707a] text-xl" />
              <select 
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                className="bg-transparent w-full outline-none text-gray-700 font-bold appearance-none cursor-pointer"
              >
                {municipiosOriente.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-32 px-6 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-80 shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 sticky top-6">
              <div className="bg-[#f8fafc] p-5 flex items-center gap-3 border-b border-gray-100 rounded-t-3xl">
                <HiOutlineFilter className="text-[#4a707a]" />
                <span className="font-semibold text-gray-700">Filtros</span>
              </div>

              <div className="p-6 space-y-8">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Establecimiento</p>
                  <div className="grid grid-cols-1 gap-2">
                    {['Todos', 'Clinicas', 'Farmacias'].map(tipo => (
                      <button 
                        key={tipo}
                        onClick={() => setTipoSeleccionado(tipo)}
                        className={`py-3 px-4 rounded-2xl border text-sm font-bold transition-all flex items-center gap-3 ${tipoSeleccionado === tipo ? 'bg-[#4a707a] text-white' : 'bg-white text-gray-600 border-gray-100 hover:border-[#4a707a]'}`}
                      >
                        {tipo === 'Todos' && <BsBuildings />}
                        {tipo === 'Clinicas' && <MdOutlineLocalHospital />}
                        {tipo === 'Farmacias' && <MdOutlineLocalPharmacy />}
                        {tipo}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Servicios Populares</p>
                  <div className="flex flex-wrap gap-2">
                    {serviciosLista.map((s) => (
                      <button 
                        key={s} 
                        onClick={() => toggleServicio(s)}
                        className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all border ${serviciosSeleccionados.includes(s) ? 'bg-[#4a707a] text-white border-[#4a707a]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#4a707a]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <h2 className="text-2xl font-bold text-[#1e3d47] mb-8">
              {loading ? "Cargando salud..." : `${clinicasData.length} resultados en ${municipio}`}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {clinicasData.map((clinica) => (
                <TarjetaClinica key={clinica.id} clinica={clinica} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
    </div>
    </AnimatedPage>
  );
};

export default Home;
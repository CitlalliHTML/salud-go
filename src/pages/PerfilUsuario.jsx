// pages/PerfilUsuario.jsx
import React, { useState } from 'react'; // 1. Importamos useState
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineArrowLeft, HiOutlineUserCircle, HiOutlineCalendar, 
  HiOutlineClipboardList, HiOutlineCog, HiOutlineLogout, 
  HiOutlinePencilAlt, HiOutlineMail, HiCheck // Importamos HiCheck para el botón de guardar
} from "react-icons/hi";
import { IoMedical } from "react-icons/io5";
import AnimatedPage from '../components/AnimatedPage';

const PerfilUsuario = () => {
  const navigate = useNavigate();

  // 2. Estados para manejar el nombre y el modo edición
  const [nombre, setNombre] = useState("Ana García");
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);

  const usuario = {
    nombre: nombre,
    email: "ana.garcia@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    idUsuario: "SG-8739"
  };

  // 3. Función para guardar el cambio
  const guardarNombre = () => {
    setNombre(nuevoNombre);
    setEditando(false);
    // Aquí podrías agregar un alert o notificación de éxito
  };

  const opcionesMenu = [
    { 
      titulo: "Mis Citas", 
      descripcion: "Ver próximas consultas y agendar nuevas", 
      icono: <HiOutlineCalendar size={26} />, 
      ruta: "/mis-citas", 
      color: "text-sky-600"
    },
    { 
      titulo: "Historial Médico", 
      descripcion: "Acceder a recetas, diagnósticos y estudios", 
      icono: <HiOutlineClipboardList size={26} />, 
      ruta: "/historial", 
      color: "text-emerald-600"
    },
    { 
      titulo: "Ajustes", 
      descripcion: "Modificar datos personales y preferencias", 
      icono: <HiOutlineCog size={26} />, 
      ruta: "/ajustes", 
      color: "text-gray-600"
    }
  ];

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* HEADER COHESIVO */}
        <header className="bg-gradient-to-r from-[#2c5d6d] to-[#1e3d47] text-white pt-10 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            <div className="flex items-start gap-4">
              <button 
                onClick={() => navigate(-1)} 
                className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
              >
                <HiOutlineArrowLeft size={20} className="text-white" />
              </button>
              <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm border border-white/30">
                    <IoMedical className="text-2xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mi SaludGo</h1>
                    <p className="text-sm opacity-90 italic">✨ Gestiona tu salud en Michoacán</p>
                  </div>
              </div>
            </div>
            
            {/* Botón de editar que activa el input */}
            <button 
              onClick={() => setEditando(!editando)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-2xl border border-white/20 transition-all text-sm font-medium"
            >
              <HiOutlinePencilAlt className="text-lg" /> {editando ? "Cancelar" : "Editar perfil"}
            </button>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="max-w-5xl mx-auto px-6 -mt-16 pb-20 relative z-10">
          
          {/* TARJETA DE PERFIL CON LÓGICA DE EDICIÓN */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-12 transition-all">
            <div className="relative group">
              <img 
                src={usuario.avatar} 
                alt={usuario.nombre} 
                className="w-40 h-40 rounded-full object-cover border-8 border-gray-50 dark:border-slate-800 shadow-inner group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-3 w-full">
              {editando ? (
                /* MOSTRAR INPUT CUANDO ESTÁ EDITANDO */
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <input 
                    type="text" 
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="text-3xl font-bold text-[#1e3d47] bg-gray-50 border-2 border-[#2c5d6d] rounded-2xl px-4 py-2 w-full md:w-auto focus:outline-none"
                    autoFocus
                  />
                  <button 
                    onClick={guardarNombre}
                    className="bg-[#2c5d6d] text-white p-3 rounded-2xl hover:bg-[#1e3d47] transition-all"
                  >
                    <HiCheck size={24} />
                  </button>
                </div>
              ) : (
                /* MOSTRAR TEXTO NORMAL */
                <h2 className="text-4xl font-extrabold text-[#1e3d47] dark:text-white tracking-tight">
                  {usuario.nombre}
                </h2>
              )}

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-gray-600">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border dark:border-slate-700 text-xs dark:text-gray-300">
                      <HiOutlineMail className="text-[#4a707a]" size={16} />
                      <span>{usuario.email}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border dark:border-slate-700 text-xs dark:text-gray-300">
                      <HiOutlineUserCircle className="text-[#4a707a]" size={16} />
                      <span>ID Usuario: {usuario.idUsuario}</span>
                  </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN DE OPCIONES BÁSICAS */}
          <section className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pl-2">Opciones básicas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {opcionesMenu.map((opcion, index) => (
                      <div 
                          key={index}
                          onClick={() => navigate(opcion.ruta)}
                          className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-md border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer flex flex-col items-center text-center space-y-5"
                      >
                          <div className={`p-4 rounded-3xl bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 ${opcion.color} shadow-inner group-hover:scale-110 transition-transform`}>
                              {opcion.icono}
                          </div>
                          <h4 className="text-xl font-bold text-[#1e3d47] dark:text-white">{opcion.titulo}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">{opcion.descripcion}</p>
                          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pt-2">Ir a {opcion.titulo} →</div>
                      </div>
                  ))}
              </div>
          </section>
          
          {/* BOTÓN CERRAR SESIÓN */}
          <div className="mt-16 text-center">
              <button 
                  onClick={() => { navigate('/login') }}
                  className="flex items-center gap-2.5 mx-auto bg-white dark:bg-slate-900 border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 px-8 py-4 rounded-3xl font-bold transition-all active:scale-95 shadow-lg text-lg"
              >
                  <HiOutlineLogout size={22} /> Cerrar Sesión
              </button>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default PerfilUsuario;
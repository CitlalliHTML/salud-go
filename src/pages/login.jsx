import React, { useState } from "react"; // 1. Importamos useState
import { Link, useNavigate } from "react-router-dom"; // 2. Importamos useNavigate
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiArrowRight,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  // 3. Definimos los estados para capturar los datos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre Login y Registro
  const [nombre, setNombre] = useState(""); // Estado nuevo para el nombre del registro

  const navigate = useNavigate();

  // 4. Función que maneja el envío del formulario
 const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Aquí decides a dónde ir
    const endpoint = isRegistering ? "/api/registro" : "/api/login";
    
    const payload = isRegistering
      ? { nombre, email, password }
      : { email, password };

    try {
      // 2. CORRECCIÓN: Usamos la variable 'endpoint' en la URL
      const response = await fetch(`https://izcali.net${endpoint}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
          setIsRegistering(false); 
          // Limpiamos los campos para que el usuario inicie sesión
          setNombre('');
          setPassword('');
        } else {
          localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
          navigate("/home");
        }
      } else {
        alert(data.message || "Ocurrió un error");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px]">
        {/* Lado Izquierdo - Panel Informativo (Sin cambios) */}
        <div className="w-full md:w-1/2 bg-[#4a707a] p-12 flex flex-col items-center justify-center text-white text-center">
          <div className="bg-white p-6 rounded-3xl shadow-lg mb-8">
            <img
              src="/logo.png"
              alt="SaludGo Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-2">SaludGo</h1>
          <p className="text-lg opacity-80 mb-12 italic">
            Tu salud, siempre cerca
          </p>
          <div className="w-full space-y-4 max-w-sm">
            {[
              "Encuentra clínicas y farmacias cerca de ti",
              "Información detallada y valoraciones",
              "Servicio rápido y confiable",
            ].map((text, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md py-3 px-6 rounded-2xl flex items-center gap-3 border border-white/20"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lado Derecho - Formulario */}
        <div className="w-full md:w-1/2 p-12 flex flex-col">
          <div className="bg-gray-100 p-1 rounded-2xl flex mb-8">
            <button
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${!isRegistering ? "bg-[#4a707a] text-white shadow-md" : "text-gray-500"}`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${isRegistering ? "bg-[#4a707a] text-white shadow-md" : "text-gray-500"}`}
            >
              Registrarse
            </button>
          </div>

          {isRegistering && (
            <div className="space-y-1 mb-4">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Nombre completo
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#4a707a] transition-all"
                />
              </div>
            </div>
          )}

          {/* 5. Agregamos el onSubmit al form */}
          <form onSubmit={handleSubmit} className="space-y-5 flex-1">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Correo electrónico
              </label>
              <div className="relative flex items-center">
                <HiOutlineMail className="absolute left-4 text-gray-400 text-xl" />
                <input
                  type="email"
                  required
                  value={email} // 6. Vinculamos con el estado
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#4a707a] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <HiOutlineLockClosed className="absolute left-4 text-gray-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"} // 7. Alternar visibilidad
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#4a707a] transition-all"
                />
                <HiOutlineEye
                  className={`absolute right-4 cursor-pointer hover:text-gray-600 ${showPassword ? "text-[#4a707a]" : "text-gray-400"}`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-[#4a707a] w-4 h-4" />
                Recordarme
              </label>
              <a href="#" className="text-[#4a707a] font-bold hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4a707a] hover:bg-[#3d5c64] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
            >
              Iniciar sesión <HiArrowRight />
            </button>
          </form>

          {/* Separador y Botones Sociales (Sin cambios) */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">
                o continúa con
              </span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors font-medium text-sm">
              <FcGoogle className="text-xl" /> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors font-medium text-sm">
              <FaFacebook className="text-xl text-blue-600" /> Facebook
            </button>
          </div>

          <Link
            to="/"
            className="text-center text-gray-500 text-sm hover:text-[#4a707a] transition-colors"
          >
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

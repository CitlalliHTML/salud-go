import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home'; 
import Login from './pages/login'; 
import FavoritesPage from './pages/FavoritesPage';
import TarjetaClinica from './components/TarjetaClinica';
import DetalleClinica from './components/DetalleClinica';
import FavoriteCard from './components/FavoriteCard';
import PerfilUsuario from './pages/PerfilUsuario';

function App() {
  return (
    
    <Routes>

    
      {/* 1. Ruta raíz: Cuando abras la página, te mandará directo a Home */}
      <Route path="/" element={<Login />} />

      {/* 2. Ruta /home: Por si quieres escribirla manualmente */}
      <Route path="/home" element={<Home />} />

      {/* 3. Ruta de Login */}
      <Route path="/login" element={<Login />} />

      <Route path="/tarjetaclinica" element={<TarjetaClinica />} />

      <Route path="/detalleclinica" element={<DetalleClinica />} />

      <Route path="/favoritespage" element={<FavoritesPage />} />

      <Route path="/favoritecard" element={<FavoriteCard />} />

      <Route path="/perfilusuario" element={<PerfilUsuario />} />

      {/* 4. Ruta para errores (404): Si escriben cualquier otra cosa, los manda al Home */}
      <Route path="*" element={<Navigate to="/" />} />

      {/*ruta para llevar al usuario de tarjeta a detalle*/}
      <Route path="/clinica/:id" element={<DetalleClinica />} />
    </Routes>

  );
}

export default App;
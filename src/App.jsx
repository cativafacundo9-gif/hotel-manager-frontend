import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import Habitaciones from './pages/Habitaciones';
import Reservas from './pages/Reservas';
import Huespedes from './pages/Huespedes';
import Mantenimiento from './pages/Mantenimiento';
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/huespedes" element={<Huespedes />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
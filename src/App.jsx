import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import Habitaciones from './components/Habitaciones';
import Reservas from './components/Reservas';
import Huespedes from './components/Huespedes';
import Mantenimiento from './components/Mantenimiento';

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
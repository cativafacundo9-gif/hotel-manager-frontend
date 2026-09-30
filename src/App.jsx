import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

// Componentes temporales vacíos hasta migrar el resto
const Habitaciones = () => <h2 className="text-center mt-5">Sección Habitaciones en construcción</h2>;
const Reservas = () => <h2 className="text-center mt-5">Sección Reservas en construcción</h2>;

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/reservas" element={<Reservas />} />
        {/* Aquí agregaremos las demás rutas luego */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
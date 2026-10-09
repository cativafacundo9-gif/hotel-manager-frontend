import React, { useState } from 'react';
import TarjetaHabitacion from '../components/TarjetaHabitacion'; // Importamos el nuevo componente
import '../styles/Habitaciones.css';

const habitacionesData = [
  {
    id: '101',
    titulo: 'Habitación 101 - Simple',
    estado: 'disponible',
    estadoTexto: 'Disponible',
    estadoBadgeClass: 'bg-success',
    limpieza: 'OK',
    limpiezaClass: 'text-dark',
    capacidad: '1 persona',
    camas: '1 Individual',
    vista: 'Jardín interior',
    comodidades: 'TV, Wi-Fi, Aire Acondicionado',
    tarifa: '$45.00 / noche'
  },
  {
    id: '102',
    titulo: 'Habitación 102 - Doble',
    estado: 'ocupada',
    estadoTexto: 'Ocupada',
    estadoBadgeClass: 'bg-danger',
    limpieza: 'Pendiente',
    limpiezaClass: 'text-gold',
    capacidad: '2 personas',
    camas: '1 Matrimonial (Queen)',
    vista: 'Calle principal',
    comodidades: 'Smart TV, Wi-Fi, Frigobar',
    tarifa: '$75.00 / noche'
  },
  {
    id: '201',
    titulo: 'Habitación 201 - Suite',
    estado: 'disponible',
    estadoTexto: 'Disponible',
    estadoBadgeClass: 'bg-success',
    limpieza: 'OK',
    limpiezaClass: 'text-dark',
    capacidad: '2 a 4 personas',
    camas: '1 King, 1 Sofá Cama',
    vista: 'Panorámica al mar/ciudad',
    comodidades: 'Jacuzzi, Balcón privado, Minibar premium',
    tarifa: '$150.00 / noche'
  }
];

export default function Habitaciones() {
  const [filtro, setFiltro] = useState('todas');

  const habitacionesFiltradas = habitacionesData.filter((hab) => {
    if (filtro === 'todas') return true;
    return hab.estado === filtro;
  });

  return (
    <main className="container my-5 flex-grow-1">
      {/* Hero Section */}
      <section className="text-white text-center p-4 p-md-5 rounded-3 shadow-lg mb-5 bg-dark bg-opacity-75 glass-hero">
        <h1 className="display-6 font-serif fw-normal mb-2">
          Módulo de <span className="fw-bold font-serif text-gold">Habitaciones</span>
        </h1>
        <p className="lead mb-0 text-white-50 fs-6 fw-light">
          Control y disponibilidad de habitaciones en tiempo real.
        </p>
      </section>

      {/* Botones de Filtro */}
      <div className="d-flex justify-content-center gap-2 mb-5">
        <button
          type="button"
          className={`btn btn-outline-dark bg-white btn-filtro shadow-sm ${filtro === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
        <button
          type="button"
          className={`btn btn-outline-dark bg-white btn-filtro shadow-sm ${filtro === 'disponible' ? 'active' : ''}`}
          onClick={() => setFiltro('disponible')}
        >
          Disponibles
        </button>
        <button
          type="button"
          className={`btn btn-outline-dark bg-white btn-filtro shadow-sm ${filtro === 'ocupada' ? 'active' : ''}`}
          onClick={() => setFiltro('ocupada')}
        >
          Ocupadas
        </button>
      </div>

      <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {habitacionesFiltradas.map((hab) => (
          <TarjetaHabitacion key={hab.id} habitacion={hab} />
        ))}
      </section>
    </main>
  );
}
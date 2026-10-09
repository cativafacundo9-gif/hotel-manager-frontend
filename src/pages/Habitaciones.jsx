import React, { useState } from 'react';
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
  const [detallesVisibles, setDetallesVisibles] = useState({});

  const toggleDetalles = (id) => {
    setDetallesVisibles((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

      {/* Grilla de Habitaciones */}
      <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {habitacionesFiltradas.map((hab) => {
          const estaAbierto = Boolean(detallesVisibles[hab.id]);

          return (
            <article key={hab.id} className="col tarjeta-habitacion">
              <div className="card h-100 border-0 shadow-sm bg-white rounded-3">
                <div className="card-body p-4 d-flex flex-column">
                  <h2 className="h4 font-serif fw-bold text-dark mb-3">{hab.titulo}</h2>
                  <p className="card-text text-muted small mb-4">
                    <span className="d-block mb-2">
                      Estado:{' '}
                      <span className={`badge ${hab.estadoBadgeClass} fw-normal`}>
                        {hab.estadoTexto}
                      </span>
                    </span>
                    <span className="d-block">
                      Limpieza: <span className={`fw-bold ${hab.limpiezaClass}`}>{hab.limpieza}</span>
                    </span>
                  </p>

                  {/* Botón para desplegar detalles */}
                  <button
                    className="btn btn-outline-dark w-100 mt-auto fw-semibold btn-detalles"
                    type="button"
                    onClick={() => toggleDetalles(hab.id)}
                  >
                    {estaAbierto ? 'Ocultar Detalles' : 'Ver Detalles'}
                  </button>

                  {/* Panel de detalles dinámico */}
                  {estaAbierto && (
                    <div className="mt-3">
                      <div className="p-3 bg-light rounded-3 border border-light small shadow-sm">
                        <ul className="list-unstyled mb-0 text-muted">
                          <li className="mb-1">
                            <strong>Capacidad:</strong> {hab.capacidad}
                          </li>
                          <li className="mb-1">
                            <strong>Camas:</strong> {hab.camas}
                          </li>
                          <li className="mb-1">
                            <strong>Vista:</strong> {hab.vista}
                          </li>
                          <li className="mb-1">
                            <strong>Comodidades:</strong> {hab.comodidades}
                          </li>
                          <li className="mt-2 text-dark fw-bold">
                            Tarifa Base: {hab.tarifa}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
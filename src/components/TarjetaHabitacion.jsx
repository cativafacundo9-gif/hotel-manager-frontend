import React, { useState } from 'react';

export default function TarjetaHabitacion({ habitacion }) {
  const [estaAbierto, setEstaAbierto] = useState(false);

  const toggleDetalles = () => {
    setEstaAbierto(!estaAbierto);
  };

  return (
    <article className="col tarjeta-habitacion">
      <div className="card h-100 border-0 shadow-sm bg-white rounded-3">
        <div className="card-body p-4 d-flex flex-column">
          <h2 className="h4 font-serif fw-bold text-dark mb-3">{habitacion.titulo}</h2>
          <p className="card-text text-muted small mb-4">
            <span className="d-block mb-2">
              Estado:{' '}
              <span className={`badge ${habitacion.estadoBadgeClass} fw-normal`}>
                {habitacion.estadoTexto}
              </span>
            </span>
            <span className="d-block">
              Limpieza: <span className={`fw-bold ${habitacion.limpiezaClass}`}>{habitacion.limpieza}</span>
            </span>
          </p>

          {/* Botón para desplegar detalles */}
          <button
            className="btn btn-outline-dark w-100 mt-auto fw-semibold btn-detalles"
            type="button"
            onClick={toggleDetalles}
          >
            {estaAbierto ? 'Ocultar Detalles' : 'Ver Detalles'}
          </button>

          {/* Panel de detalles dinámico */}
          {estaAbierto && (
            <div className="mt-3">
              <div className="p-3 bg-light rounded-3 border border-light small shadow-sm">
                <ul className="list-unstyled mb-0 text-muted">
                  <li className="mb-1">
                    <strong>Capacidad:</strong> {habitacion.capacidad}
                  </li>
                  <li className="mb-1">
                    <strong>Camas:</strong> {habitacion.camas}
                  </li>
                  <li className="mb-1">
                    <strong>Vista:</strong> {habitacion.vista}
                  </li>
                  <li className="mb-1">
                    <strong>Comodidades:</strong> {habitacion.comodidades}
                  </li>
                  <li className="mt-2 text-dark fw-bold">
                    Tarifa Base: {habitacion.tarifa}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
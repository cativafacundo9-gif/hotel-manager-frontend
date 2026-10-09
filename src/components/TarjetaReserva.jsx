import React from 'react';

export default function TarjetaReserva({ reserva, onCancelar }) {
  return (
    <article className="col">
      <div className="card h-100 border-0 shadow-sm bg-white rounded-3">
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h4 className="h5 font-serif fw-bold text-dark mb-0">{reserva.cliente}</h4>
            <span className="badge bg-success fw-normal">{reserva.estado}</span>
          </div>
          <p className="text-muted small mb-3">{reserva.habitacion}</p>
          
          <ul className="list-unstyled small text-muted mb-4 border-top pt-3">
            <li className="mb-1">
              <strong>Check-In:</strong> {reserva.fechaIngreso}
            </li>
            <li>
              <strong>Check-Out:</strong> {reserva.fechaSalida}
            </li>
          </ul>

          <button
            className="btn btn-outline-danger btn-sm mt-auto w-100 fw-semibold"
            onClick={() => onCancelar(reserva.id)}
          >
            Cancelar Reserva
          </button>
        </div>
      </div>
    </article>
  );
}
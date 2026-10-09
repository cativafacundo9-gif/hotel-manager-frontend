import React, { useState } from 'react';
import TarjetaReserva from '../components/TarjetaReserva';
import '../styles/Reservas.css';

// Datos iniciales de ejemplo
const reservasIniciales = [
  {
    id: 1,
    cliente: 'Carlos Tevez',
    habitacion: '102 - Suite Presidencial',
    fechaIngreso: '2026-10-10',
    fechaSalida: '2026-10-15',
    estado: 'Confirmada'
  },
  {
    id: 2,
    cliente: 'Lionel Messi',
    habitacion: '301 - Deluxe Vista al Mar',
    fechaIngreso: '2026-10-12',
    fechaSalida: '2026-10-18',
    estado: 'Check-In Pendiente'
  }
];

export default function Reservas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarListado, setMostrarListado] = useState(true);

  const [reservas, setReservas] = useState(reservasIniciales);
  const [alerta, setAlerta] = useState(null);

  const [formData, setFormData] = useState({
    clienteNombre: '',
    habitacionSelect: '',
    fechaIngreso: '',
    fechaSalida: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.clienteNombre || !formData.habitacionSelect || !formData.fechaIngreso || !formData.fechaSalida) {
      setAlerta({ tipo: 'danger', mensaje: 'Por favor complete todos los campos del formulario.' });
      return;
    }

    if (formData.fechaSalida <= formData.fechaIngreso) {
      setAlerta({
        tipo: 'danger',
        mensaje: 'La fecha de Check-Out debe ser posterior a la fecha de Check-In.'
      });
      return;
    }

    const nuevaReserva = {
      id: Date.now(),
      cliente: formData.clienteNombre,
      habitacion: formData.habitacionSelect,
      fechaIngreso: formData.fechaIngreso,
      fechaSalida: formData.fechaSalida,
      estado: 'Confirmada'
    };

    setReservas([nuevaReserva, ...reservas]);
    setAlerta({ tipo: 'success', mensaje: '¡Reserva registrada con éxito!' });

    setFormData({
      clienteNombre: '',
      habitacionSelect: '',
      fechaIngreso: '',
      fechaSalida: ''
    });

    setMostrarListado(true);
  };

  const handleCancelar = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  return (
    <main className="container my-5 flex-grow-1">
      {/* Hero Section */}
      <section className="text-white text-center p-4 p-md-5 rounded-3 shadow-lg mb-5 bg-dark bg-opacity-75 glass-hero">
        <h1 className="display-6 font-serif fw-normal mb-2">
          Módulo de <span className="fw-bold font-serif text-gold">Reservas</span>
        </h1>
        <p className="lead mb-0 text-white-50 fs-6 fw-light">
          Gestión de ingresos, salidas y reservas activas.
        </p>
      </section>

      {/* Grilla de Opciones */}
      <section className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
        <article className="col col-lg-5">
          <div className="card h-100 border-0 shadow-sm bg-white rounded-3">
            <div className="card-body p-4 d-flex flex-column text-center text-md-start">
              <h2 className="h4 font-serif fw-bold text-dark mb-3">Nueva Reserva</h2>
              <p className="card-text text-muted small mb-4">
                Cargar huésped, fechas y tipo de habitación.
              </p>
              <button
                className="btn btn-outline-dark w-100 mt-auto fw-semibold shadow-sm"
                type="button"
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
              >
                {mostrarFormulario ? 'Ocultar Formulario' : 'Crear Reserva'}
              </button>
            </div>
          </div>
        </article>

        <article className="col col-lg-5">
          <div className="card h-100 border-0 shadow-sm bg-white rounded-3">
            <div className="card-body p-4 d-flex flex-column text-center text-md-start">
              <h2 className="h4 font-serif fw-bold text-dark mb-3">Check-In / Check-Out</h2>
              <p className="card-text text-muted small mb-4">
                Controlar ingresos y egresos del día.
              </p>
              <button
                className="btn btn-outline-dark w-100 mt-auto fw-semibold shadow-sm"
                type="button"
                onClick={() => setMostrarListado(!mostrarListado)}
              >
                {mostrarListado ? 'Ocultar Listado' : 'Ver Listado'}
              </button>
            </div>
          </div>
        </article>
      </section>

      {mostrarFormulario && (
        <section className="mt-4 pt-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card border border-light shadow-lg bg-white p-4 p-md-5 rounded-3">
                <h3 className="h4 font-serif fw-bold text-dark mb-4 text-center">
                  Registrar Nueva <span className="text-gold">Reserva</span>
                </h3>

                {alerta && (
                  <div className={`alert alert-${alerta.tipo} alert-dismissible fade show mb-4`} role="alert">
                    {alerta.mensaje}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setAlerta(null)}
                      aria-label="Cerrar"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="clienteNombre" className="form-label fw-semibold small text-dark text-uppercase tracking-wider">
                      Nombre Completo del Huésped
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      id="clienteNombre"
                      placeholder="Ej: Carlos Tevez"
                      value={formData.clienteNombre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="habitacionSelect" className="form-label fw-semibold small text-dark text-uppercase tracking-wider">
                      Tipo de Habitación
                    </label>
                    <select
                      className="form-select form-select-lg bg-light border-0"
                      id="habitacionSelect"
                      value={formData.habitacionSelect}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Seleccionar habitación...</option>
                      <option value="101 - Individual Standard">101 - Individual Standard</option>
                      <option value="102 - Suite Presidencial">102 - Suite Presidencial</option>
                      <option value="204 - Doble Superior">204 - Doble Superior</option>
                      <option value="301 - Deluxe Vista al Mar">301 - Deluxe Vista al Mar</option>
                    </select>
                  </div>

                  <div className="row g-3 mb-5">
                    <div className="col-6">
                      <label htmlFor="fechaIngreso" className="form-label fw-semibold small text-dark text-uppercase tracking-wider">
                        Check-In
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg bg-light border-0"
                        id="fechaIngreso"
                        value={formData.fechaIngreso}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="fechaSalida" className="form-label fw-semibold small text-dark text-uppercase tracking-wider">
                        Check-Out
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg bg-light border-0"
                        id="fechaSalida"
                        value={formData.fechaSalida}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-dark btn-lg w-100 fw-semibold text-uppercase shadow-sm">
                    Guardar Reserva
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {mostrarListado && (
        <section className="mt-5 pt-4">
          <div className="mb-4 text-center bg-white p-4 rounded-3 shadow-sm border border-light">
            <h3 className="h3 font-serif fw-bold text-dark mb-2">
              Listado de Reservas <span className="text-gold">Activas</span>
            </h3>
            <p className="text-muted small fw-light mb-0">
              Administre ingresos, salidas y cancelaciones registradas en el sistema.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {reservas.length === 0 ? (
              <div className="col-12 text-center text-muted py-4">
                No hay reservas activas en este momento.
              </div>
            ) : (
              reservas.map((res) => (
                <TarjetaReserva 
                  key={res.id} 
                  reserva={res} 
                  onCancelar={handleCancelar} 
                />
              ))
            )}
          </div>
        </section>
      )}
    </main>
  );
}
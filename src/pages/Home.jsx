import React, { useState, useEffect } from 'react';
import { ModuleCard } from '../components/ModuleCard';
import { CurrencyWidget } from '../components/CurrencyWidget';

import imgHabitaciones from '../assets/img/habitaciones.jpg';
import imgReservas from '../assets/img/reservas.jpg';
import imgHuespedes from '../assets/img/huespedes.jpg';
import imgMantenimiento from '../assets/img/mantenimiento.jpg';

export const Home = () => {
  const [horaActual, setHoraActual] = useState('00:00:00');
  const [saludo, setSaludo] = useState('');

  useEffect(() => {
    const actualizarTiempo = () => {
      const ahora = new Date();
      setHoraActual(ahora.toLocaleTimeString('es-ES'));

      // Lógica para el saludo dinámico
      const hora = ahora.getHours();
      if (hora >= 5 && hora < 12) {
        setSaludo('Buenos días');
      } else if (hora >= 12 && hora < 20) {
        setSaludo('Buenas tardes');
      } else {
        setSaludo('Buenas noches');
      }
    };

    actualizarTiempo(); // Ejecutar inmediatamente al montar
    const intervalo = setInterval(actualizarTiempo, 1000); // Luego cada segundo
    
    return () => clearInterval(intervalo);
  }, []);

  const modules = [
    { num: '01', title: 'Habitaciones', desc: 'Verifique el estado, control de limpieza y disponibilidad diaria.', img: imgHabitaciones, path: '/habitaciones' },
    { num: '02', title: 'Reservas', desc: 'Administre ingresos, salidas y nuevas reservas de clientes.', img: imgReservas, path: '/reservas' },
    { num: '03', title: 'Huéspedes', desc: 'Consulte el directorio corporativo e historial de estancias.', img: imgHuespedes, path: '/huespedes' },
    { num: '04', title: 'Mantenimiento', desc: 'Control de reportes de fallas y cronograma de limpieza.', img: imgMantenimiento, path: '/mantenimiento' },
  ];

  return (
    <main className="container my-5 flex-grow-1">
      {/* Encabezado con saludo y hora actual */}
      <section className="text-white p-4 p-md-5 rounded-3 shadow-lg mb-5 d-md-flex justify-content-between align-items-center bg-dark">
        <div className="mb-4 mb-md-0">
          <h1 className="display-6 font-serif fw-normal mb-2 text-white">
            {saludo}, <span className="fw-bold font-serif">Admin</span> | Panel general
          </h1>
          <p className="lead mb-0 text-white-50 fs-6 fw-light">
            Seleccione un módulo para gestionar las operaciones del hotel.
          </p>
        </div>
        <div className="d-inline-flex align-items-center gap-3 border border-secondary px-4 py-3 rounded-3 bg-transparent">
          <span className="text-white-50 small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
            Hora actual:
          </span>
          <span className="fw-bold text-gold font-monospace fs-5">{horaActual}</span>
        </div>
      </section>

      {/* Módulos principales del hotel */}
      <section className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {modules.map((mod) => (
          <ModuleCard 
            key={mod.num}
            image={mod.img}
            moduleNumber={mod.num}
            title={mod.title}
            description={mod.desc}
            linkTo={mod.path}
          />
        ))}
      </section>

      {/* Widget de Conversión de Divisas en la parte inferior de los módulos */}
      <CurrencyWidget />
    </main>
  );
};
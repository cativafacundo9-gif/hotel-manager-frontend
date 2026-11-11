import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function HolidayWidget() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  const currentYear = new Date().getFullYear();
  const countryCode = 'AR';

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/${currentYear}/${countryCode}`);
        const today = new Date();
        const upcomingHolidays = response.data.filter(holiday => new Date(holiday.date) >= today);
        
        // Tomamos los próximos 4 feriados
        setHolidays(upcomingHolidays.slice(0, 4));
      } catch (err) {
        console.error('Error al conectar con la API:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudieron sincronizar los días festivos desde el servidor.',
          confirmButtonColor: '#212529'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [API_BASE_URL, currentYear]);

  if (loading) {
    return (
      <div className="card border-0 shadow-sm bg-white rounded-3 p-4 text-center my-3">
        <p className="text-muted mb-0">Cargando calendario de alta demanda...</p>
      </div>
    );
  }

  return (
    <article className="card border-0 shadow-sm bg-white rounded-3 my-3">
      <div className="card-body p-4">
        <h2 className="h4 font-serif fw-bold text-dark mb-1">
          Próximos Feriados y Fines de Semana ({currentYear})
        </h2>
        <p className="text-muted small mb-4">
          Alertas de alta ocupación hotelera
        </p>

        {holidays.length > 0 ? (
          <ul className="list-unstyled mb-0">
            {holidays.map((holiday, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <div>
                  <span className="d-block fw-semibold text-dark">{holiday.localName}</span>
                  <small className="text-muted">Tipo: {holiday.types.join(', ')}</small>
                </div>
                <span className="badge bg-light text-dark border border-gold px-3 py-2 fw-normal">
                  {holiday.date}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted small mb-0">No hay más feriados registrados para lo que resta del año.</p>
        )}
      </div>
    </article>
  );
}
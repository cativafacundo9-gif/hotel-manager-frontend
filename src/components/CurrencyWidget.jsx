import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const CurrencyWidget = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para la calculadora
  const [monto, setMonto] = useState(100);
  const [monedaOrigen, setMonedaOrigen] = useState('USD');
  const [monedaDestino, setMonedaDestino] = useState('ARS');
  const [tipoOperacion, setTipoOperacion] = useState('compra'); // 'compra' o 'venta'

  const API_URL = import.meta.env.VITE_API_URL;

  const monedasDisponibles = [
    { codigo: 'ARS', nombre: 'Pesos Argentinos (ARS)', simbolo: '$' },
    { codigo: 'USD', nombre: 'Dólar Estadounidense (USD)', simbolo: 'US$' },
    { codigo: 'EUR', nombre: 'Euro (EUR)', simbolo: '€' },
    { codigo: 'BRL', nombre: 'Real Brasileño (BRL)', simbolo: 'R$' },
    { codigo: 'CLP', nombre: 'Peso Chileno (CLP)', simbolo: 'CLP$' },
    { codigo: 'UYU', nombre: 'Peso Uruguayo (UYU)', simbolo: '$U' },
  ];

  useEffect(() => {
    const obtenerCotizaciones = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setCotizaciones(response.data);
      } catch (error) {
        console.error('Error al consultar la API de divisas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de divisas',
          text: 'No se pudieron obtener las cotizaciones de la API.',
          confirmButtonColor: '#d33'
        });
      } finally {
        setLoading(false);
      }
    };

    obtenerCotizaciones();
  }, [API_URL]);

  // Función helper para obtener el precio en ARS de cualquier moneda
  const obtenerTasaEnARS = (codigoMoneda, tipo) => {
    if (codigoMoneda === 'ARS') return 1;

    // Busca la moneda en el arreglo devuelto por DolarApi
    const divisa = cotizaciones.find((c) => {
      const cod = (c.moneda || '').toUpperCase();
      const casa = (c.casa || '').toLowerCase();
      
      if (codigoMoneda === 'USD') return cod === 'USD' && (casa === 'oficial' || casa === 'bolsa' || casa === 'contadoconliqui');
      return cod === codigoMoneda;
    });

    if (!divisa) return 1;
    return tipo === 'compra' ? divisa.compra : divisa.venta;
  };

  // Cálculo de la conversión
  const calcularConversion = () => {
    const valorMonto = parseFloat(monto) || 0;
    if (valorMonto <= 0) return 0;

    // 1. Obtener la equivalencia en ARS de la moneda de origen
    const tasaOrigenEnARS = obtenerTasaEnARS(monedaOrigen, tipoOperacion);
    const equivalenteEnARS = valorMonto * tasaOrigenEnARS;

    // 2. Si el destino es ARS, devolvemos el total acumulado en pesos
    if (monedaDestino === 'ARS') {
      return equivalenteEnARS;
    }

    // 3. Si el destino es USD, convertimos los ARS a USD dividiendo por la tasa del Dólar
    if (monedaDestino === 'USD') {
      const tasaDolar = obtenerTasaEnARS('USD', tipoOperacion);
      return tasaDolar > 0 ? equivalenteEnARS / tasaDolar : 0;
    }

    return equivalenteEnARS;
  };

  if (loading) {
    return (
      <div className="card p-4 text-center bg-dark border border-secondary text-white-50 my-5 rounded-3 shadow-lg">
        <p className="mb-0 font-monospace">Cargando tasas de cambio para la recepción...</p>
      </div>
    );
  }

  const resultado = calcularConversion();
  const simboloDestino = monedaDestino === 'USD' ? 'US$' : '$';
  const tasaOrigenAplicada = obtenerTasaEnARS(monedaOrigen, tipoOperacion);
  const tasaDolarAplicada = obtenerTasaEnARS('USD', tipoOperacion);

  return (
    <section className="bg-dark text-white p-4 p-md-5 rounded-3 shadow-lg mt-5 border border-secondary">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="h4 font-serif fw-normal mb-1 text-white">
            Cotizaciones y Calculadora | <span className="fw-bold font-serif text-white">Recepción</span>
          </h2>
          <p className="lead mb-0 text-white-50 fs-6 fw-light">
            Conversión instantánea para cobros a huéspedes extranjeros.
          </p>
        </div>
        <div className="d-inline-flex align-items-center gap-2 border border-secondary px-3 py-2 rounded-3 bg-transparent">
          <span className="text-white-50 small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>Base:</span>
          <span className="fw-bold text-gold font-monospace small">ARS</span>
        </div>
      </div>

      {/* 1. Tarjetas de cotizaciones en vivo con valores explícitos en ARS */}
      <div className="row g-3 mb-5">
        {cotizaciones.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 bg-transparent border border-secondary text-white p-3 rounded-3 shadow-sm">
              <span className="text-uppercase text-white-50 small fw-bold font-monospace" style={{ letterSpacing: '1px' }}>
                {item.moneda}
              </span>
              <h3 className="h6 font-serif fw-bold text-gold mb-3 mt-1">
                {item.nombre}
              </h3>
              
              <div className="d-flex justify-content-between text-white-50 small mb-1">
                <span>Compra (Caja):</span>
                <span className="fw-bold text-success font-monospace">${item.compra} ARS</span>
              </div>
              <div className="d-flex justify-content-between text-white-50 small">
                <span>Venta:</span>
                <span className="fw-bold text-info font-monospace">${item.venta} ARS</span>
              </div>

              <small className="text-white-50 mt-3 d-block text-end font-monospace" style={{ fontSize: '0.75rem' }}>
                Act: {new Date(item.fechaActualizacion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Calculadora de Conversión */}
      <div className="border border-secondary rounded-3 p-4 bg-transparent shadow-sm">
        <h3 className="h5 font-serif fw-bold text-white mb-4 d-flex align-items-center gap-2">
          Calculadora Rápida de Cobro
        </h3>

        <div className="row g-3 align-items-end">
          {/* Monto */}
          <div className="col-12 col-md-3">
            <label className="form-label text-white-50 small fw-bold">Monto a convertir:</label>
            <input
              type="number"
              min="0"
              className="form-control bg-dark text-white border-secondary fw-bold font-monospace"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>

          {/* Moneda de Origen */}
          <div className="col-12 col-sm-6 col-md-3">
            <label className="form-label text-white-50 small fw-bold">Moneda del huésped:</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={monedaOrigen}
              onChange={(e) => setMonedaOrigen(e.target.value)}
            >
              {monedasDisponibles.map((m) => (
                <option key={m.codigo} value={m.codigo}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Moneda de Destino */}
          <div className="col-12 col-sm-6 col-md-3">
            <label className="form-label text-white-50 small fw-bold">Convertir a:</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={monedaDestino}
              onChange={(e) => setMonedaDestino(e.target.value)}
            >
              <option value="ARS">Pesos Argentinos (ARS)</option>
              <option value="USD">Dólares Estadounidenses (USD)</option>
            </select>
          </div>

          {/* Selector de Tipo de Operación (Compra/Venta) */}
          <div className="col-12 col-md-3">
            <label className="form-label text-white-50 small fw-bold">Tasa aplicada:</label>
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn btn-sm ${tipoOperacion === 'compra' ? 'btn-success fw-bold' : 'btn-outline-secondary text-white-50'}`}
                onClick={() => setTipoOperacion('compra')}
              >
                Compra
              </button>
              <button
                type="button"
                className={`btn btn-sm ${tipoOperacion === 'venta' ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary text-white-50'}`}
                onClick={() => setTipoOperacion('venta')}
              >
                Venta
              </button>
            </div>
          </div>
        </div>

        {/* Panel con el Resultado Final */}
        <div className="mt-4 p-3 border border-secondary rounded-3 d-flex justify-content-between align-items-center flex-wrap gap-2 bg-transparent">
          <div>
            <span className="text-white-50 small d-block">Resultado estimado a cobrar/recibir:</span>
            <small className="text-white-50 d-block">
              {monto} {monedaOrigen} con cotización de <strong className="text-white">{tipoOperacion.toUpperCase()}</strong>
            </small>
            <small className="text-gold font-monospace d-block mt-1">
              {monedaOrigen !== 'ARS' ? (
                <>Tasa tomada: 1 {monedaOrigen} = ${tasaOrigenAplicada.toLocaleString('es-AR', { minimumFractionDigits: 2 })} ARS</>
              ) : (
                <>Tasa tomada: 1 ARS = $1,00 ARS</>
              )}
              {monedaDestino === 'USD' && monedaOrigen !== 'USD' && (
                <span className="ms-2">| 1 USD = ${tasaDolarAplicada.toLocaleString('es-AR', { minimumFractionDigits: 2 })} ARS</span>
              )}
            </small>
          </div>
          <div className="text-end">
            <span className="fs-3 fw-bold text-gold font-monospace">
              {simboloDestino} {resultado.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {monedaDestino}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
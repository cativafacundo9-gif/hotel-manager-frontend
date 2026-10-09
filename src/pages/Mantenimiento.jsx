import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Collapse } from 'react-bootstrap';
import TarjetaReporte from '../components/TarjetaReporte';
import TarjetaTarea from '../components/TarjetaTarea';

const reportesIniciales = [
  { id: 1, titulo: 'Aire acondicionado roto en la 102', ubicacion: 'Habitación 102', prioridad: 'Alta', estado: 'Pendiente' },
  { id: 2, titulo: 'Fuga de agua en baño de la 204', ubicacion: 'Habitación 204', prioridad: 'Alta', estado: 'Pendiente' },
  { id: 3, titulo: 'Televisor no enciende en Suite 301', ubicacion: 'Habitación 301', prioridad: 'Media', estado: 'Pendiente' }
];

const tareasData = [
  { id: 1, titulo: 'Limpieza profunda de alfombras', sector: 'Pasillos del Piso 2', fecha: '20/10/2026', estado: 'Programado' },
  { id: 2, titulo: 'Revisión del sistema de calderas', sector: 'Sala de máquinas', fecha: '22/10/2026', estado: 'Programado' },
  { id: 3, titulo: 'Desinfección de áreas de Spa y Piscina', sector: 'Planta baja', fecha: '25/10/2026', estado: 'Programado' }
];

const Mantenimiento = () => {
  const [openReportes, setOpenReportes] = useState(false);
  const [openCronograma, setOpenCronograma] = useState(false);
  const [reportes, setReportes] = useState(reportesIniciales);

  const toggleEstado = (id) => {
    const nuevosReportes = reportes.map(reporte => {
      if (reporte.id === id) {
        return { 
          ...reporte, 
          estado: reporte.estado === 'Pendiente' ? 'Resuelto' : 'Pendiente' 
        };
      }
      return reporte;
    });
    setReportes(nuevosReportes);
  };

  return (
    <Container className="py-4 flex-grow-1">
      <section 
        className="text-white text-center p-4 rounded-3 shadow-sm mb-4 bg-dark d-flex flex-column justify-content-center" 
        style={{ minHeight: '160px', '--bs-bg-opacity': .75, backdropFilter: 'blur(5px)' }}
      >
        <h1 className="display-6 font-serif fw-normal mb-2">
          Módulo de <span className="fw-bold font-serif text-gold">Mantenimiento</span>
        </h1>
        <p className="lead mb-0 text-white-50 fs-6 fw-light">Seguimiento de incidencias técnicas y reparaciones.</p>
      </section>

      <Row xs={1} md={2} className="g-4 justify-content-center">
        <Col lg={5}>
          <Card className="h-100 border-0 shadow-sm rounded-3">
            <Card.Body className="p-4 d-flex flex-column text-center text-md-start">
              <h2 className="h4 font-serif fw-bold text-dark mb-3">Reportes Activos</h2>
              <Card.Text className="text-muted small mb-4">Incidencias reportadas en habitaciones o áreas comunes.</Card.Text>
              <Button 
                variant="outline-dark" 
                className="w-100 mt-auto fw-semibold shadow-sm"
                onClick={() => setOpenReportes(!openReportes)}
              >
                {openReportes ? 'Ocultar Reportes' : 'Ver Reportes'}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="h-100 border-0 shadow-sm rounded-3">
            <Card.Body className="p-4 d-flex flex-column text-center text-md-start">
              <h2 className="h4 font-serif fw-bold text-dark mb-3">Tareas de Limpieza</h2>
              <Card.Text className="text-muted small mb-4">Cronograma de limpieza profunda y mantenimiento preventivo.</Card.Text>
              <Button 
                variant="outline-dark" 
                className="w-100 mt-auto fw-semibold shadow-sm"
                onClick={() => setOpenCronograma(!openCronograma)}
              >
                {openCronograma ? 'Ocultar Cronograma' : 'Ver Cronograma'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Collapse in={openReportes}>
        <div id="seccion-reportes" className="mt-4 pt-2">
          <Row xs={1} md={2} lg={3} className="g-3">
            {reportes.map((reporte) => (
              <TarjetaReporte 
                key={reporte.id} 
                reporte={reporte} 
                toggleEstado={toggleEstado} 
              />
            ))}
          </Row>
        </div>
      </Collapse>

      <Collapse in={openCronograma}>
        <div id="seccion-cronograma" className="mt-4 pt-2">
          <Row xs={1} md={2} lg={3} className="g-3">
            {tareasData.map((tarea) => (
              <TarjetaTarea key={tarea.id} tarea={tarea} />
            ))}
          </Row>
        </div>
      </Collapse>
    </Container>
  );
};

export default Mantenimiento;
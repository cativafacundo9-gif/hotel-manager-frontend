import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Collapse } from 'react-bootstrap';

const huespedesData = [
  { id: 1, nombre: 'Juan Pérez', dni: '12.345.678', habitacion: '102 - Suite', estado: 'Activo', color: 'success' },
  { id: 2, nombre: 'María Gómez', dni: '87.654.321', habitacion: '204 - Doble', estado: 'Finalizado', color: 'secondary' },
  { id: 3, nombre: 'Carlos López', dni: '45.678.910', habitacion: '105 - Individual', estado: 'Activo', color: 'success' },
  { id: 4, nombre: 'Ana Martínez', dni: '33.221.100', habitacion: '301 - Deluxe', estado: 'Activo', color: 'success' }
];

const historialData = [
  { id: 1, nombre: 'Juan Pérez', habitacion: '102 - Suite', fechas: '10/01/2026 - 15/01/2026', pref: 'Piso alto, cama King', estado: 'Finalizada', color: 'secondary' },
  { id: 2, nombre: 'María Gómez', habitacion: '204 - Doble', fechas: '01/02/2026 - 05/02/2026', pref: 'Desayuno incluido', estado: 'Finalizada', color: 'secondary' },
  { id: 3, nombre: 'Carlos López', habitacion: '105 - Individual', fechas: '20/02/2026 - 22/02/2026', pref: 'Check-in tardío', estado: 'Cancelada', color: 'danger' }
];

const Huespedes = () => {
  // Estados para controlar los menús desplegables
  const [openDirectorio, setOpenDirectorio] = useState(false);
  const [openHistorial, setOpenHistorial] = useState(false);
  
  // Estado para el buscador en tiempo real
  const [busqueda, setBusqueda] = useState('');

  // Lógica de filtrado en tiempo real
  const huespedesFiltrados = huespedesData.filter((huesped) =>
    huesped.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Container className="my-5 flex-grow-1">
      <section 
        className="text-white text-center p-4 p-md-5 rounded-3 shadow-lg mb-5 bg-dark" 
        style={{ '--bs-bg-opacity': .75, backdropFilter: 'blur(5px)' }}
      >
        <h1 className="display-6 font-serif fw-normal mb-2">
          Módulo de <span className="fw-bold font-serif text-gold">Huéspedes</span>
        </h1>
        <p className="lead mb-0 text-white-50 fs-6 fw-light">Directorio e historial de clientes registrados.</p>
      </section>

      <Row xs={1} md={2} className="g-4 justify-content-center">
        <Col lg={5}>
          <Card className="h-100 border-0 shadow-sm rounded-3">
            <Card.Body className="p-4 d-flex flex-column text-center text-md-start">
              <h2 className="h4 font-serif fw-bold text-dark mb-3">Lista de Huéspedes</h2>
              <Card.Text className="text-muted small mb-4">Consultar datos de contacto y documentos.</Card.Text>
              <Button 
                variant="outline-dark" 
                className="w-100 mt-auto fw-semibold shadow-sm"
                onClick={() => setOpenDirectorio(!openDirectorio)}
                aria-controls="seccion-directorio"
                aria-expanded={openDirectorio}
              >
                {openDirectorio ? 'Ocultar Directorio' : 'Ver Directorio'}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="h-100 border-0 shadow-sm rounded-3">
            <Card.Body className="p-4 d-flex flex-column text-center text-md-start">
              <h2 className="h4 font-serif fw-bold text-dark mb-3">Historial de Estancias</h2>
              <Card.Text className="text-muted small mb-4">Registro de visitas anteriores y preferencias.</Card.Text>
              <Button 
                variant="outline-dark" 
                className="w-100 mt-auto fw-semibold shadow-sm"
                onClick={() => setOpenHistorial(!openHistorial)}
                aria-controls="seccion-historial"
                aria-expanded={openHistorial}
              >
                {openHistorial ? 'Ocultar Historial' : 'Consultar'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Collapse in={openDirectorio}>
        <div id="seccion-directorio" className="mt-5 pt-4">
          <div className="mb-4 text-center bg-white p-4 rounded-3 shadow-sm">
            <h3 className="h3 font-serif fw-bold text-dark mb-2">
              Directorio de <span className="text-gold">Huéspedes</span>
            </h3>
            <p className="text-muted small fw-light mb-0">Escriba un nombre para filtrar la lista en tiempo real.</p>
          </div>

          <div className="mb-4">
            <Form.Control 
              size="lg" 
              type="text" 
              placeholder="Buscar huésped por nombre..." 
              className="bg-white border-0 shadow-sm"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <Row xs={1} md={2} lg={3} className="g-3">
            {huespedesFiltrados.length > 0 ? (
              huespedesFiltrados.map((huesped) => (
                <Col key={huesped.id}>
                  <Card className="h-100 border-0 shadow-sm rounded-3 p-3">
                    <Card.Body>
                      <h4 className="h6 font-serif fw-bold text-dark mb-2">{huesped.nombre}</h4>
                      <p className="text-muted small mb-1"><strong>DNI:</strong> {huesped.dni}</p>
                      <p className="text-muted small mb-2"><strong>Habitación:</strong> {huesped.habitacion}</p>
                      <Badge bg={huesped.color}>{huesped.estado}</Badge>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center py-4">
                <p className="text-muted">No se encontraron huéspedes con el nombre "{busqueda}".</p>
              </Col>
            )}
          </Row>
        </div>
      </Collapse>

      <Collapse in={openHistorial}>
        <div id="seccion-historial" className="mt-5 pt-4">
          <div className="mb-4 text-center bg-white p-4 rounded-3 shadow-sm">
            <h3 className="h3 font-serif fw-bold text-dark mb-2">
              Historial de <span className="text-gold">Estancias</span>
            </h3>
            <p className="text-muted small fw-light mb-0">Registro histórico de visitas y estadías anteriores.</p>
          </div>

          <Row xs={1} md={2} lg={3} className="g-3">
            {historialData.map((item) => (
              <Col key={item.id}>
                <Card className="h-100 border-0 shadow-sm rounded-3 p-3">
                  <Card.Body>
                    <h4 className="h6 font-serif fw-bold text-dark mb-2">{item.nombre}</h4>
                    <p className="text-muted small mb-1"><strong>Habitación:</strong> {item.habitacion}</p>
                    <p className="text-muted small mb-1"><strong>Fechas:</strong> {item.fechas}</p>
                    <p className="text-muted small mb-2"><strong>Preferencia:</strong> {item.pref}</p>
                    <Badge bg={item.color}>{item.estado}</Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Collapse>

    </Container>
  );
};

export default Huespedes;
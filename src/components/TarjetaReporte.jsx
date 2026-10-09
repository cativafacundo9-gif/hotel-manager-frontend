import React from 'react';
import { Col, Card, Badge, Button } from 'react-bootstrap';

export default function TarjetaReporte({ reporte, toggleEstado }) {
  return (
    <Col>
      <Card className="h-100 border-0 shadow-sm rounded-3 p-3">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h4 className="h6 font-serif fw-bold text-dark mb-0">{reporte.titulo}</h4>
            <Badge bg={reporte.estado === 'Pendiente' ? 'danger' : 'success'}>
              {reporte.estado}
            </Badge>
          </div>
          <p className="text-muted small mb-1"><strong>Ubicación:</strong> {reporte.ubicacion}</p>
          <p className="text-muted small mb-3"><strong>Prioridad:</strong> {reporte.prioridad}</p>
          
          <Button 
            variant={reporte.estado === 'Pendiente' ? 'outline-success' : 'outline-secondary'} 
            size="sm"
            className="w-100 mt-auto fw-semibold shadow-sm"
            onClick={() => toggleEstado(reporte.id)}
          >
            {reporte.estado === 'Pendiente' ? 'Marcar como resuelto' : 'Deshacer (Volver a Pendiente)'}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
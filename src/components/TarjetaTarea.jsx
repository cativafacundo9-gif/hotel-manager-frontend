import React from 'react';
import { Col, Card, Badge } from 'react-bootstrap';

export default function TarjetaTarea({ tarea }) {
  return (
    <Col>
      <Card className="h-100 border-0 shadow-sm rounded-3 p-3">
        <Card.Body>
          <h4 className="h6 font-serif fw-bold text-dark mb-2">{tarea.titulo}</h4>
          <p className="text-muted small mb-1"><strong>Sector:</strong> {tarea.sector}</p>
          <p className="text-muted small mb-2"><strong>Fecha programada:</strong> {tarea.fecha}</p>
          <Badge bg="info" text="dark">{tarea.estado}</Badge>
        </Card.Body>
      </Card>
    </Col>
  );
}
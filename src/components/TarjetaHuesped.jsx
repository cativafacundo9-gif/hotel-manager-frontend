import React from 'react';
import { Col, Card, Badge } from 'react-bootstrap';

export default function TarjetaHuesped({ huesped }) {
  return (
    <Col>
      <Card className="h-100 border-0 shadow-sm rounded-3 p-3">
        <Card.Body>
          <h4 className="h6 font-serif fw-bold text-dark mb-2">{huesped.nombre}</h4>
          <p className="text-muted small mb-1"><strong>DNI:</strong> {huesped.dni}</p>
          <p className="text-muted small mb-2"><strong>Habitación:</strong> {huesped.habitacion}</p>
          <Badge bg={huesped.color}>{huesped.estado}</Badge>
        </Card.Body>
      </Card>
    </Col>
  );
}
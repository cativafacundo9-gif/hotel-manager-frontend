import React from 'react';
import { Col, Card, Badge } from 'react-bootstrap';

export default function TarjetaHistorial({ item }) {
  return (
    <Col>
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
  );
}
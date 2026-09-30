import React from 'react';
import { Container } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer className="py-4 mt-auto border-top border-light bg-white bg-opacity-75 backdrop-blur-sm">
      <Container className="text-center">
        <p className="mb-0 small fw-light text-muted">
          &copy; 2026 HotelAdmin. Panel de administración reservado.
        </p>
      </Container>
    </footer>
  );
};
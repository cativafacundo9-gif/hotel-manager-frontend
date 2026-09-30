import React from 'react';
import { Container } from 'react-bootstrap';

export const Header = () => {
  return (
    <header className="py-3 sticky-top shadow-sm border-bottom border-light bg-white">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span className="fs-4 tracking-wide text-dark">
            <span className="fw-light">Hotel</span>
            <span className="font-serif text-gold fw-bold">Admin</span>
          </span>
          <span className="text-muted fw-light fs-6 d-none d-sm-inline ms-2">| Panel Ejecutivo</span>
        </div>
        <span className="badge border border-gold text-dark rounded-pill fw-normal px-4 py-2 bg-gold-light">
          Usuario: Admin
        </span>
      </Container>
    </header>
  );
};
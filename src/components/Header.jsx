import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importamos de React Bootstrap

export function Header() {
  const location = useLocation();
  const esHome = location.pathname === '/';

  // Función para saber si la ruta actual coincide y marcarla en negrita
  const isActive = (path) => location.pathname === path ? "fw-bold text-dark border-bottom border-dark" : "text-secondary";

  return (
    <Navbar expand="lg" sticky="top" className="py-3 shadow-sm border-bottom border-light bg-white">
      <Container className="d-flex justify-content-between align-items-center">
        
        {/* Logo que siempre redirige al inicio */}
        <Navbar.Brand as={Link} to="/" className="fs-4 tracking-wide text-dark text-decoration-none p-0">
          <span className="fw-light">Hotel</span>
          <span className="font-serif text-gold fw-bold">Admin</span>{' '}
          <span className="text-secondary fw-light fs-6 text-lowercase">| Panel</span>
        </Navbar.Brand>

        {/* Si estoy en el Home mostramos la etiqueta de usuario. 
            Si estoy en un módulo, habilitamos el Navbar Toggle y Collapse */}
        {esHome ? (
          <span className="badge border border-gold text-dark rounded-pill fw-normal px-4 py-2 bg-gold-light">
            Usuario: Admin
          </span>
        ) : (
          <>
            {/* Botón Hamburguesa nativo de React-Bootstrap */}
            <Navbar.Toggle aria-controls="menuNavegacion" className="border-0 shadow-none" />
            
            {/* Menú colapsable */}
            <Navbar.Collapse id="menuNavegacion" className="justify-content-end">
              <Nav className="gap-2 text-center mt-3 mt-lg-0 align-items-lg-center">
                <Nav.Link as={Link} to="/" className={isActive('/')}>Inicio</Nav.Link>
                <Nav.Link as={Link} to="/habitaciones" className={isActive('/habitaciones')}>Habitaciones</Nav.Link>
                <Nav.Link as={Link} to="/reservas" className={isActive('/reservas')}>Reservas</Nav.Link>
                <Nav.Link as={Link} to="/huespedes" className={isActive('/huespedes')}>Huéspedes</Nav.Link>
                <Nav.Link as={Link} to="/mantenimiento" className={isActive('/mantenimiento')}>Mantenimiento</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}
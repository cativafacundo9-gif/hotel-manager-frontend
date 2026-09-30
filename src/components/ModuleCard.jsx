import React from 'react';
import { Link } from 'react-router-dom';

export const ModuleCard = ({ image, moduleNumber, title, description, linkTo }) => {
  return (
    <article className="col">
      <div className="card h-100 border-0 shadow-sm bg-white rounded-3">
        <img src={image} className="card-img-top img-cover-180" alt={`Gestión de ${title}`} />
        <div className="card-body p-4 d-flex flex-column">
          <span className="text-uppercase text-gold fw-bold mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1.5px' }}>
            Módulo {moduleNumber}
          </span>
          <h2 className="h4 font-serif fw-bold text-dark mb-3">{title}</h2>
          <p className="card-text text-muted small mb-4 fw-light">{description}</p>
          <Link to={linkTo} className="btn btn-dark w-100 mt-auto text-uppercase py-2" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
            Gestionar
          </Link>
        </div>
      </div>
    </article>
  );
};
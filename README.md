Sistema de Gestión Hotelera 🏨

Este proyecto es el Frontend de una aplicación web para la administración integral de un hotel. Permite gestionar de manera eficiente las habitaciones, reservas, información de los huéspedes y las tareas de mantenimiento, ofreciendo una interfaz de usuario moderna, rápida y responsiva.

Este proyecto corresponde al Trabajo Práctico de la cursada, habiendo sido migrado exitosamente de HTML/CSS estático a una Single Page Application (SPA) utilizando React.

🚀 Funcionalidades Principales

Gestión de Habitaciones: Visualización del estado, tipo y precio de las habitaciones.

Módulo de Reservas: Control de ingresos, salidas y asignación de habitaciones.

Registro de Huéspedes: Administración de la base de datos de los clientes.

Mantenimiento: Seguimiento del estado de los reportes y tareas del hotel (Pendiente / Resuelto).

🛠️ Tecnologías Utilizadas

React (v18): Biblioteca principal para la construcción de interfaces de usuario.

Vite: Herramienta de construcción (bundler) ultrarrápida para el entorno de desarrollo.

React Router DOM: Para la gestión de rutas y navegación sin recarga de página (SPA).

React-Bootstrap: Framework de componentes UI responsivos.

CSS Puro: Estilos globales y específicos mantenidos para personalización a medida.

📁 Estructura del Proyecto

El proyecto sigue una arquitectura profesional basada en la separación de responsabilidades:

src/
├── assets/ # Imágenes, iconos y recursos estáticos
├── components/ # Componentes reutilizables (Header, Footer, Tarjetas)
├── pages/ # Vistas principales (Home, Habitaciones, Reservas, etc.)
├── App.jsx # Configuración de rutas (React Router) y layout principal
└── main.jsx # Punto de entrada de la aplicación React

⚙️ Instalación y Ejecución

Para clonar y ejecutar este proyecto en tu entorno local, sigue estos pasos:

Clonar el repositorio:

git clone https://github.com/cativafacundo9-gif/hotel-manager-frontend

Navegar al directorio del proyecto:

cd <hotel-manager-fronted>

Instalar las dependencias:

npm install

Iniciar el servidor de desarrollo:

npm run dev

Abrir en el navegador: Vite proporcionará una ruta local (por lo general http://localhost:5173/). Se Ábre en el navegador para ver la aplicación funcionando.

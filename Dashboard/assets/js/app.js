import { Navbar } from './components/Navbar.js';
import { Sidebar } from './components/Sidebar.js';
import { Content } from './components/Content.js';
import { Renombrado } from './components/Renombrado.js';
import { Comparacion } from './components/Comparacion.js';
import { Envio } from './components/Envio.js';
import { Registro } from './components/Registro.js';
import { Manual } from './components/Manual.js';

document.addEventListener("DOMContentLoaded", function() {
    // Renderizar componentes principales
    document.getElementById('sidebar').innerHTML = Sidebar();
    document.getElementById('navbar').innerHTML = Navbar();
    document.getElementById('app-content').innerHTML = Content();

    // Cargar página por defecto
    loadPage('inicio');

    // Manejo de clics en los enlaces del menú
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const page = this.getAttribute("data-page");

            // Añadir clase para animación de salida
            const content = document.getElementById('app-content');
            content.classList.add('fade-out');

            // Esperar a que termine la animación antes de cambiar el contenido
            setTimeout(() => {
                loadPage(page);
                setActiveLink(this);
                // Quitar la clase de animación
                content.classList.remove('fade-out');
                content.classList.add('fade-in');

                setTimeout(() => {
                    content.classList.remove('fade-in');
                }, 500);
            }, 300);
        });
    });

    function loadPage(page) {
        const content = document.getElementById('app-content');
        switch(page) {
            case 'inicio':
                content.innerHTML = `
                    <div class="welcome-section">
                        <h2 class="text-center mb-4">Bienvenido al Dashboard</h2>
                        <p class="lead text-center">Selecciona una aplicación desde el menú para comenzar.</p>
                        <div class="feature-icons">
                            <div class="feature-item">
                                <div class="icon">🏷</div>
                                <h5>Renombrado</h5>
                            </div>
                            <div class="feature-item">
                                <div class="icon">🔍</div>
                                <h5>Comparación</h5>
                            </div>
                            <div class="feature-item">
                                <div class="icon">📧</div>
                                <h5>Envío</h5>
                            </div>
                            <div class="feature-item">
                                <div class="icon">📄</div>
                                <h5>Registro</h5>
                            </div>
                        </div>
                    </div>`;
                break;
            case 'renombrado':
                content.innerHTML = Renombrado();
                break;
            case 'comparacion':
                content.innerHTML = Comparacion();
                break;
            case 'envio':
                content.innerHTML = Envio();
                break;
            case 'registro':
                content.innerHTML = Registro();
                break;
            case 'manual':
                content.innerHTML = Manual();
                break;
            default:
                content.innerHTML = `
                    <div class="page-header">
                        <h3 class="animated-title">${page.toUpperCase()}</h3>
                        <div class="header-underline"></div>
                    </div>
                    <div class="card shadow-sm p-4 mt-4">
                        <p class="lead">Contenido de la aplicación ${page}.</p>
                        <p>Esta es una demostración del contenido para la sección de ${page}. Aquí podrás gestionar todas las funcionalidades relacionadas.</p>
                    </div>`;
        }
    }

    function setActiveLink(activeLink) {
        const links = document.querySelectorAll(".nav-link");
        links.forEach(link => link.classList.remove("active"));
        activeLink.classList.add("active");
    }

    // Efecto hover para los elementos del menú
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateX(5px)';
            }
        });

        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateX(0)';
            }
        });
    });
});
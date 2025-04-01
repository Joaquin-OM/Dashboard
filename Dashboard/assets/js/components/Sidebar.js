export const Sidebar = () => {
    return `
      <nav class="sidebar p-3">
        <h4 class="text-center mb-4">Dashboard</h4>
        <ul class="nav flex-column">
          <li class="nav-item"><a href="#" class="nav-link" data-page="renombrado"><i class="fas fa-tag me-2"></i> Renombrado</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-page="comparacion"><i class="fas fa-search me-2"></i> Comparación</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-page="envio"><i class="fas fa-paper-plane me-2"></i> Envío de listados</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-page="registro"><i class="fas fa-file-alt me-2"></i> Registro docs</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-page="manual"><i class="fas fa-book me-2"></i> Modo de Uso</a></li>
        </ul>
        <div class="theme-switcher-desktop d-none d-lg-block">
          <div class="d-flex align-items-center gap-2 p-3">
            <i class="fas fa-sun theme-icon"></i>
            <label class="switch">
              <input type="checkbox" id="themeToggle">
              <span class="slider"></span>
            </label>
            <i class="fas fa-moon theme-icon"></i>
          </div>
        </div>
        <div class="sidebar-footer mt-auto pt-4">
          <p class="text-center small">© 2023 Dashboard Moderno</p>
        </div>
      </nav>
    `;
  };
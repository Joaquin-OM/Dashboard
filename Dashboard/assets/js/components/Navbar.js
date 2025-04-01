export const Navbar = () => {
    return `
      <header class="p-3 d-flex justify-content-between align-items-center">
        <h3 class="m-0">Control Panel</h3>
        <div class="d-flex align-items-center gap-3">
          <div class="theme-switcher-mobile d-lg-none">
            <label class="switch">
              <input type="checkbox" id="themeToggleMobile">
              <span class="slider"></span>
            </label>
            <i class="fas fa-moon theme-icon"></i>
          </div>
          <div class="user-info">
            <span><i class="fas fa-user-circle"></i> Usuario</span>
          </div>
        </div>
      </header>
    `;
  };
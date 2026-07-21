// Thème clair / sombre — auto selon l'heure, avec préférence manuelle mémorisée
(function () {
  const STORAGE_KEY = 'yourdrip-theme';

  function timeBasedTheme() {
    const hour = new Date().getHours();
    return (hour >= 7 && hour < 19) ? 'light' : 'dark';
  }

  function currentTheme() {
    return localStorage.getItem(STORAGE_KEY) || timeBasedTheme();
  }

  function syncToggleButtons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const nextLabel = theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair';
      btn.setAttribute('aria-label', nextLabel);
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    syncToggleButtons(theme);
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme());

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
      });
    });
  });
})();

// Run before the stylesheet to avoid flashing the wrong theme on page loads.
(() => {
    const key = 'portfolio-theme';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    let preference = null;
    let button;

    try {
        const saved = localStorage.getItem(key);
        if (saved === 'light' || saved === 'dark') preference = saved;
    } catch {
        // The switch still works when browser storage is unavailable.
    }

    function applyTheme() {
        const theme = preference || (systemTheme.matches ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
        if (button) button.setAttribute('aria-pressed', String(theme === 'dark'));
    }

    applyTheme();
    systemTheme.addEventListener('change', applyTheme);
    window.addEventListener('storage', (event) => {
        if (event.key === key || event.key === null) {
            preference = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
            applyTheme();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        button = document.querySelector('.theme-toggle');
        if (!button) return;
        button.hidden = false;
        applyTheme();
        button.addEventListener('click', () => {
            preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem(key, preference); } catch { /* Storage is optional. */ }
            applyTheme();
        });
    });
})();

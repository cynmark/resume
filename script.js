// Preview project images in the current page using the native accessible dialog.
const preview = document.getElementById('project-preview');
if (preview) {
    const image = document.getElementById('preview-image');
    const title = document.getElementById('preview-title');
    const imageArea = document.getElementById('preview-image-area');
    const zoom = document.getElementById('preview-zoom');
    let trigger;

    function resetZoom() {
        imageArea.classList.remove('is-zoomed');
        imageArea.tabIndex = -1;
        imageArea.scrollTo(0, 0);
        zoom.setAttribute('aria-pressed', 'false');
        zoom.textContent = 'Zoom in';
    }

    document.querySelectorAll('[data-preview-title]').forEach((button) => {
        button.addEventListener('click', () => {
            trigger = button;
            const thumbnail = button.querySelector('img');
            image.src = thumbnail.src;
            image.alt = thumbnail.alt;
            title.textContent = button.dataset.previewTitle;
            resetZoom();
            preview.showModal();
            document.documentElement.classList.add('preview-open');
        });
    });

    zoom.addEventListener('click', () => {
        const enlarged = imageArea.classList.toggle('is-zoomed');
        imageArea.tabIndex = enlarged ? 0 : -1;
        zoom.setAttribute('aria-pressed', String(enlarged));
        zoom.textContent = enlarged ? 'Fit image' : 'Zoom in';
        imageArea.scrollTo(0, 0);
    });
    // Keep Tab navigation inside the preview, including its scrollable zoom area.
    preview.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') return;
        const controls = [...preview.querySelectorAll('button:not([disabled]), [tabindex="0"]')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
    preview.addEventListener('click', (event) => {
        const bounds = preview.getBoundingClientRect();
        if (event.target === preview && (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom)) preview.close();
    });
    preview.addEventListener('close', () => {
        document.documentElement.classList.remove('preview-open');
        resetZoom();
        trigger?.focus({ preventScroll: true });
    });
}

// Keep the section navigation in sync without hiding any links on mobile.
const homeSection = document.getElementById('home');

if (homeSection) {
    const navigationLinks = document.querySelectorAll('.navigation a[data-section]');
    const sections = [...document.querySelectorAll('main section[id]')];
    const header = document.querySelector('.site-header');
    let scheduled = false;

    function updateNavigation() {
        let activeSection = 'home';
        const offset = header.getBoundingClientRect().height + 48;

        for (const section of sections) {
            if (section.getBoundingClientRect().top <= offset) activeSection = section.id;
        }
        if (['education', 'background'].includes(activeSection)) activeSection = 'about';

        navigationLinks.forEach(function (link) {
            if (link.dataset.section === activeSection) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
        scheduled = false;
    }

    window.addEventListener('scroll', function () {
        if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(updateNavigation);
        }
    }, { passive: true });
    window.addEventListener('resize', updateNavigation);
    window.addEventListener('load', updateNavigation);
    updateNavigation();
}

// GitHub Pages has no form server. Open a properly formatted email draft.
const form = document.getElementById('contact-form');
if (form) {
    const formStatus = document.getElementById('form-status');
    const message = document.getElementById('message');

    message.addEventListener('input', function () {
        message.setCustomValidity(message.value.trim() ? '' : 'Please enter a message.');
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = new FormData(form);
        const name = data.get('fname').trim() + ' ' + data.get('lname').trim();
        const subject = 'Portfolio enquiry from ' + name;
        const body = [
            'Name: ' + name,
            'Email: ' + data.get('email').trim(),
            'Mobile: ' + (data.get('tel').trim() || 'Not provided'),
            '',
            data.get('message').trim()
        ].join('\r\n');

        window.location.href = form.action + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        formStatus.textContent = 'Your draft is ready for your email app. If nothing opens, use chayanin.pre@mahidol.ac.th directly. This website has not sent your message.';
    });

    form.addEventListener('reset', function () {
        message.setCustomValidity('');
        formStatus.textContent = '';
    });
}

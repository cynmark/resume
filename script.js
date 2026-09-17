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

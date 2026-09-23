# Chayanin Preechapanij — Portfolio

A static portfolio for Developer Internship applications, built with HTML, CSS, and vanilla JavaScript.

## Website

GitHub Pages address: https://cynmark.github.io/resume/

## Project files

- `index.html` — portfolio homepage
- `contact.html` — contact details and email-draft form
- `styles.css` — shared responsive styles
- `script.js` — section navigation and email-draft behavior
- `theme.js` — system-aware dark mode and saved theme preference
- `resume.pdf` — one-page English resume based on the public portfolio
- `assets/portfolio-preview.png` — project preview image
- `.nojekyll` — serves the static files without Jekyll processing

## Hosting

In repository Settings → Pages, use **Deploy from a branch**, choose **main**, and select **/(root)**. No build command or package installation is required. Future pushes to `main` update the site automatically.

Use relative links for pages and assets so the site works under `/resume/`.

## Contact form

The form prepares a draft in the visitor's configured email application. The visitor reviews and sends the message there. The website has no backend and does not store or send messages itself.

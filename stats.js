document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        const nazwaSekcji = this.textContent.trim(); // np. "Kontakt", "Galeria"

        gtag('event', 'klik_nawigacja', {
            event_category: 'menu',
            event_label: nazwaSekcji
        });
    });
});

// Śledzenie kliknięcia "Akceptuję"
document.getElementById('cookie-accept')?.addEventListener('click', function () {
    gtag('event', 'cookie_akceptacja', {
        event_category: 'cookie',
        event_label: 'Akceptuję'
    });
});

// Śledzenie kliknięcia "Odrzucam"
document.getElementById('cookie-reject')?.addEventListener('click', function () {
    gtag('event', 'cookie_odrzucenie', {
        event_category: 'cookie',
        event_label: 'Odrzucam'
    });
});

// (Opcjonalnie) Kliknięcie w link do polityki prywatności
document.getElementById('cookie-policy-link')?.addEventListener('click', function () {
    gtag('event', 'klik_polityka_cookie', {
        event_category: 'cookie',
        event_label: 'Polityka prywatności'
    });
});
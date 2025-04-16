// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.control-dot');

// Variables
let currentSlide = 0;
let slideInterval;

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('scroll', handleScroll);
menuToggle.addEventListener('click', toggleMenu);

// Initialize
function init() {
    // Start slider
    startSlider();

    // Add click events to navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }

            // Smooth scroll to target
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Add click events to slider dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
}

// Handle scroll event
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Toggle mobile menu
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Toggle menu animation
    const spans = menuToggle.querySelectorAll('span');

    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Slider functions
function startSlider() {
    // Show first slide
    showSlide(currentSlide);

    // Start automatic sliding
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show active slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    // Reset interval to avoid quick slide change
    clearInterval(slideInterval);

    currentSlide = index;
    showSlide(currentSlide);

    // Restart interval
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// Gallery image zoom effect
const galleryImages = document.querySelectorAll('.gallery-image');
galleryImages.forEach(image => {
    image.addEventListener('mouseover', () => {
        image.style.transform = 'scale(1.1)';
    });

    image.addEventListener('mouseout', () => {
        image.style.transform = 'scale(1)';
    });
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');

        // Skip if it's just a "#" link
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 150) {
            section.classList.add('revealed');
        }
    });
}

// Add scroll event for animations
window.addEventListener('scroll', revealOnScroll);

// Funkcja do powielania logotypów dla nieskończonego przewijania
function setupPartnersSlider() {
    const partnersSlider = document.querySelector('.partners-slider');

    if (partnersSlider) {
        // Klonujemy wszystkie loga, aby uzyskać płynne nieskończone przewijanie
        const sliderContent = partnersSlider.innerHTML;
        partnersSlider.innerHTML = sliderContent + sliderContent;

        // Dostosowanie szerokości kontenera
        updateSliderWidth();

        // Zatrzymaj animację przy najechaniu myszą
        partnersSlider.addEventListener('mouseenter', () => {
            partnersSlider.style.animationPlayState = 'paused';
        });

        // Wznów animację po odjechaniu myszą
        partnersSlider.addEventListener('mouseleave', () => {
            partnersSlider.style.animationPlayState = 'running';
        });
    }
}

// Aktualizacja szerokości slidera po załadowaniu wszystkich obrazów
function updateSliderWidth() {
    const partnersSlider = document.querySelector('.partners-slider');
    const partnerLogos = document.querySelectorAll('.partner-logo');

    if (partnersSlider && partnerLogos.length > 0) {
        let totalWidth = 0;

        partnerLogos.forEach(logo => {
            const style = window.getComputedStyle(logo);
            const width = parseFloat(style.width);
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);

            totalWidth += width + marginLeft + marginRight;
        });

        // Ustawienie szerokości slidera na połowę całkowitej szerokości
        // (ponieważ zduplikowaliśmy zawartość)
        partnersSlider.style.width = `${totalWidth / 2}px`;
    }
}

// Dodaj wywołanie funkcji do inicjalizacji
document.addEventListener('DOMContentLoaded', function() {
    setupPartnersSlider();

    // Obsługa zdarzenia załadowania wszystkich obrazów
    window.addEventListener('load', updateSliderWidth);
});

// Funkcja do ustawienia nieskończonego przewijania logotypów
function setupInfinitePartnerScroll() {
    // const partnersContainer = document.querySelector('.partners-container');
    const partnersSlider = document.querySelector('.partners-slider');

    if (!partnersSlider) return;

    // 1. Klonujemy zawartość slidera
    const originalItems = partnersSlider.innerHTML;
    partnersSlider.innerHTML = originalItems + originalItems;

    // 2. Mierzymy całkowitą szerokość pojedynczego zestawu logotypów
    let sliderItemWidth = 0;
    const logos = document.querySelectorAll('.partner-logo');

    // Obliczamy szerokość pierwszej połowy elementów (oryginalne elementy)
    const originalLogosCount = logos.length / 2;
    for (let i = 0; i < originalLogosCount; i++) {
        const style = window.getComputedStyle(logos[i]);
        const width = logos[i].offsetWidth;
        const marginLeft = parseInt(style.marginLeft);
        const marginRight = parseInt(style.marginRight);
        sliderItemWidth += width + marginLeft + marginRight;
    }

    // 3. Ustawiamy animację CSS z dokładną szerokością
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes infiniteScroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-${sliderItemWidth}px);
            }
        }
        
        .partners-slider {
            animation: infiniteScroll ${20 + logos.length}s linear infinite;
        }
    `;
    document.head.appendChild(styleSheet);

    // 4. Obsługa najechania myszą - zatrzymanie/wznowienie animacji
    partnersSlider.addEventListener('mouseenter', () => {
        partnersSlider.style.animationPlayState = 'paused';
    });

    partnersSlider.addEventListener('mouseleave', () => {
        partnersSlider.style.animationPlayState = 'running';
    });
}

// Inicjalizacja po pełnym załadowaniu strony
window.addEventListener('load', setupInfinitePartnerScroll);



// Obsługa rozwijanych kategorii w cenniku
document.addEventListener('DOMContentLoaded', function() {
    const categoryHeaders = document.querySelectorAll('.category-header');

    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Przełącz stan aktywny dla klikniętego nagłówka
            this.classList.toggle('active');

            // Opcjonalnie: zamknij inne kategorie, gdy otwierasz nową
            // categoryHeaders.forEach(otherHeader => {
            //     if (otherHeader !== header) {
            //         otherHeader.classList.remove('active');
            //     }
            // });
        });
    });

    // // Domyślnie otwórz pierwszą kategorię
    // if (categoryHeaders.length > 0) {
    //     categoryHeaders[0].classList.add('active');
    // }
});
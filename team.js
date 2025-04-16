// Team member hover effect
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    member.addEventListener('mouseover', () => {
        member.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
    });

    member.addEventListener('mouseout', () => {
        member.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    });
});


// Team Slider
const teamSliderWrapper = document.querySelector('.team-slider-wrapper');
const teamSlides = document.querySelectorAll('.team-slide');
const teamDots = document.querySelectorAll('.team-slider-dot');
const teamPrevBtn = document.querySelector('.team-slider-prev');
const teamNextBtn = document.querySelector('.team-slider-next');

let teamCurrentSlide = 0;
const teamSlidesCount = teamSlides.length;
let autoSlideInterval;

// Initialize team slider
function initTeamSlider() {
    // Add click events to dots
    teamDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToTeamSlide(slideIndex);
            stopAutoSlide(); // Zatrzymaj automatyczne przesuwanie po interakcji użytkownika
        });
    });

    // Add click events to navigation buttons
    teamPrevBtn.addEventListener('click', () => {
        prevTeamSlide();
        stopAutoSlide(); // Zatrzymaj automatyczne przesuwanie po interakcji użytkownika
    });
    teamNextBtn.addEventListener('click', () => {
        nextTeamSlide();
        stopAutoSlide(); // Zatrzymaj automatyczne przesuwanie po interakcji użytkownika
    });

    // Enable touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    teamSliderWrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    teamSliderWrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleTeamSwipe();
        stopAutoSlide(); // Zatrzymaj automatyczne przesuwanie po interakcji użytkownika
    });

    function handleTeamSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            nextTeamSlide();
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            prevTeamSlide();
        }
    }

    // Show initial slide
    showTeamSlide(teamCurrentSlide);

    // Start auto slide
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextTeamSlide, 4000); // Zmiana na 4 sekundy
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function showTeamSlide(index) {
    teamSliderWrapper.style.transform = `translateX(-${index * (100 / teamSlidesCount)}%)`;
    teamDots.forEach(dot => dot.classList.remove('active'));
    teamDots[index].classList.add('active');
    teamCurrentSlide = index;
}

function nextTeamSlide() {
    if (teamCurrentSlide >= teamSlidesCount - 1) {
        showTeamSlide(0);
    } else {
        showTeamSlide(teamCurrentSlide + 1);
    }
}

function prevTeamSlide() {
    if (teamCurrentSlide <= 0) {
        showTeamSlide(teamSlidesCount - 1);
    } else {
        showTeamSlide(teamCurrentSlide - 1);
    }
}

function goToTeamSlide(index) {
    showTeamSlide(index);
}

// Initialize team slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.team-slider-wrapper')) {
        initTeamSlider();
    }
});
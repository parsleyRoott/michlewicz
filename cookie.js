// Cookie Consent Management
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('cookie-accept');
    const rejectButton = document.getElementById('cookie-reject');
    const policyLink = document.getElementById('cookie-policy-link');
    const policyModal = document.getElementById('cookie-policy-modal');
    const closeModal = document.querySelector('.close-modal');
    const closePolicy = document.getElementById('close-policy');

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');

    if (!cookieChoice) {
        // Show cookie banner after 1 second
        setTimeout(() => {
            cookieConsent.classList.add('active');
        }, 1000);
    }

    // Accept cookies
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('active');
        // Here you could initialize analytics or other cookie-dependent scripts
    });

    // Reject cookies
    rejectButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieConsent.classList.remove('active');
        // Here you would ensure no non-essential cookies are set
    });

    // Open policy modal
    policyLink.addEventListener('click', (e) => {
        e.preventDefault();
        policyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal functions
    function closeModalFunc() {
        policyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeModalFunc);
    closePolicy.addEventListener('click', closeModalFunc);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === policyModal) {
            closeModalFunc();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && policyModal.style.display === 'block') {
            closeModalFunc();
        }
    });
});
/* --- GHOST CURSOR SETUP --- */
const cursorDot = document.querySelector('.cursor-dot');
const cursorLens = document.querySelector('.cursor-lens');

let mouseX = 0;
let mouseY = 0;
let lensX = 0;
let lensY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
    let distX = mouseX - lensX;
    let distY = mouseY - lensY;
    
    lensX = lensX + (distX * 0.12); 
    lensY = lensY + (distY * 0.12);

    cursorLens.style.left = `${lensX}px`;
    cursorLens.style.top = `${lensY}px`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

/* --- HOVER DETECTION & CURSOR MANAGEMENT --- */
const interactables = document.querySelectorAll('a, button, .nav-links span, .square-card, .toggle-password');
const authCard = document.querySelector('.auth-card');

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
        if (el.classList.contains('square-card')) {
            el.style.transform = 'scale(1.02) translateY(-5px)';
        }
    });

    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
        if (el.classList.contains('square-card')) {
            el.style.transform = 'scale(1) translateY(0)';
        }
    });
});

/* DETECT IF HOVERING FORM TO SWITCH CURSORS */
if (authCard) {
    authCard.addEventListener('mouseenter', () => {
        // Add class to body to hide custom cursor and show default
        document.body.classList.add('form-mode');
    });

    authCard.addEventListener('mouseleave', () => {
        // Remove class to show custom cursor again
        document.body.classList.remove('form-mode');
    });
}

/* --- PASSWORD VISIBILITY TOGGLE --- */
function togglePassword(inputId, toggleBtn) {
    const input = document.getElementById(inputId);
    
    if (input.type === "password") {
        input.type = "text";
        toggleBtn.textContent = "HIDE";
        toggleBtn.style.color = "var(--neon-green)";
    } else {
        input.type = "password";
        toggleBtn.textContent = "SHOW";
        toggleBtn.style.color = "#666";
    }
}   

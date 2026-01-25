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

/* --- HOVER DETECTION --- */
const interactables = document.querySelectorAll('a, button, .nav-links span, .square-card');

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
        // Apply transform to cards on hover
        if (el.classList.contains('square-card')) {
            el.style.transform = 'scale(1.02) translateY(-5px)';
        }
    });

    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
        // Reset transform
        if (el.classList.contains('square-card')) {
            el.style.transform = 'scale(1) translateY(0)';
        }
    });
});
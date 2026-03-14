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
        document.body.classList.add('form-mode');
    });

    authCard.addEventListener('mouseleave', () => {
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

/* ============================================================
   VALIDATION UTILITIES
   ============================================================ */

function showError(input, message) {
    clearError(input);
    input.style.borderBottomColor = '#ff4d4d';

    const error = document.createElement('span');
    error.className = 'validation-error';
    error.textContent = message;
    error.style.cssText = [
        'display: block',
        'color: #ff4d4d',
        'font-size: 0.68rem',
        'letter-spacing: 1px',
        'text-transform: uppercase',
        'margin-top: 8px',
        "font-family: 'Inter', sans-serif"
    ].join(';');
    input.parentNode.appendChild(error);
}

function clearError(input) {
    input.style.borderBottomColor = '';
    const existing = input.parentNode.querySelector('.validation-error');
    if (existing) existing.remove();
}

function showSuccess(input) {
    clearError(input);
    input.style.borderBottomColor = 'var(--neon-green)';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

function showToast(message, type) {
    type = type || 'error';
    const existing = document.querySelector('.lustre-toast');
    if (existing) existing.remove();

    const isSuccess = type === 'success';
    const toast = document.createElement('div');
    toast.className = 'lustre-toast';
    toast.textContent = message;
    toast.style.cssText = [
        'position: fixed',
        'bottom: 40px',
        'left: 50%',
        'transform: translateX(-50%) translateY(20px)',
        'background: ' + (isSuccess ? 'rgba(204,235,69,0.15)' : 'rgba(255,77,77,0.15)'),
        'border: 1px solid ' + (isSuccess ? '#cceb45' : '#ff4d4d'),
        'color: ' + (isSuccess ? '#cceb45' : '#ff4d4d'),
        'padding: 14px 30px',
        'font-size: 0.75rem',
        'letter-spacing: 2px',
        'text-transform: uppercase',
        "font-family: 'Inter', sans-serif",
        'border-radius: 1px',
        'z-index: 99999',
        'opacity: 0',
        'transition: opacity 0.3s ease, transform 0.3s ease',
        'backdrop-filter: blur(10px)',
        'white-space: nowrap'
    ].join(';');
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(function() { toast.remove(); }, 300);
    }, 3500);
}

/* ============================================================
   LOGIN FORM VALIDATION  (login.html)
   ============================================================ */

(function initLoginValidation() {
    var emailInput    = document.querySelector('.auth-section #email');
    var passwordInput = document.querySelector('.auth-section #password');
    var submitBtn     = document.querySelector('#login-submit, .auth-section a.save');

    // Only run on login page (has email + password but NOT #fullname)
    if (!emailInput || !passwordInput || !submitBtn || document.querySelector('#fullname')) return;

    emailInput.addEventListener('blur', function() {
        var val = emailInput.value.trim();
        if (!val) showError(emailInput, 'User ID / Email is required');
        else if (!isValidEmail(val)) showError(emailInput, 'Enter a valid email address');
        else showSuccess(emailInput);
    });

    passwordInput.addEventListener('blur', function() {
        if (!passwordInput.value) showError(passwordInput, 'Password is required');
        else showSuccess(passwordInput);
    });

    emailInput.addEventListener('input', function() { clearError(emailInput); });
    passwordInput.addEventListener('input', function() { clearError(passwordInput); });

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var valid = true;

        var emailVal = emailInput.value.trim();
        if (!emailVal) {
            showError(emailInput, 'User ID / Email is required'); valid = false;
        } else if (!isValidEmail(emailVal)) {
            showError(emailInput, 'Enter a valid email address'); valid = false;
        } else {
            showSuccess(emailInput);
        }

        if (!passwordInput.value) {
            showError(passwordInput, 'Password is required'); valid = false;
        } else {
            showSuccess(passwordInput);
        }

        if (!valid) {
            showToast('Please fix the errors above before continuing.');
            return;
        }

        /* --- ADMIN ROLE DETECTION ---
           Demo credentials: admin@lustre.com / Admin1234
           All other valid logins go to profile.html
        ------------------------------------------------- */
        var isAdmin = (emailVal === 'admin@lustre.com' && passwordInput.value === 'Admin1234');

        if (isAdmin) {
            sessionStorage.setItem('userRole', 'admin');
            showToast('Admin access granted — redirecting to dashboard...', 'success');
            setTimeout(function() { window.location.href = 'admin.html'; }, 1200);
        } else {
            sessionStorage.setItem('userRole', 'user');
            showToast('Access granted — initializing session...', 'success');
            setTimeout(function() { window.location.href = 'profile.html'; }, 1200);
        }
    });
}());

/* ============================================================
   SIGNUP FORM VALIDATION  (signup.html)
   ============================================================ */

(function initSignupValidation() {
    var nameInput    = document.querySelector('#fullname');
    var emailInput   = document.querySelector('#email');
    var passInput    = document.querySelector('#password');
    var confirmInput = document.querySelector('#confirm-password');
    var submitBtn    = document.querySelector('.auth-section a.save');

    if (!nameInput || !emailInput || !passInput || !confirmInput || !submitBtn) return;

    function validateName() {
        var val = nameInput.value.trim();
        if (!val) { showError(nameInput, 'Name is required'); return false; }
        if (val.length < 2) { showError(nameInput, 'Name must be at least 2 characters'); return false; }
        showSuccess(nameInput); return true;
    }
    function validateEmail() {
        var val = emailInput.value.trim();
        if (!val) { showError(emailInput, 'Email is required'); return false; }
        if (!isValidEmail(val)) { showError(emailInput, 'Enter a valid email address'); return false; }
        showSuccess(emailInput); return true;
    }
    function validatePassword() {
        var val = passInput.value;
        if (!val) { showError(passInput, 'Passcode is required'); return false; }
        if (!isStrongPassword(val)) {
            showError(passInput, 'Min 8 chars, 1 uppercase letter, 1 number');
            return false;
        }
        showSuccess(passInput); return true;
    }
    function validateConfirm() {
        var val = confirmInput.value;
        if (!val) { showError(confirmInput, 'Please confirm your passcode'); return false; }
        if (val !== passInput.value) { showError(confirmInput, 'Passcodes do not match'); return false; }
        showSuccess(confirmInput); return true;
    }

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    passInput.addEventListener('blur', validatePassword);
    confirmInput.addEventListener('blur', validateConfirm);

    nameInput.addEventListener('input', function() { clearError(nameInput); });
    emailInput.addEventListener('input', function() { clearError(emailInput); });
    passInput.addEventListener('input', function() { clearError(passInput); });
    confirmInput.addEventListener('input', function() { clearError(confirmInput); });

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var results = [validateName(), validateEmail(), validatePassword(), validateConfirm()];
        if (results.indexOf(false) !== -1) {
            showToast('Please fix all errors before establishing a link.');
            return;
        }
        showToast('Identity established — welcome to LUSTRE!', 'success');
        setTimeout(function() { window.location.href = 'profile.html'; }, 1200);
    });
}());

/* ============================================================
   SETTINGS FORM VALIDATION  (settings.html)
   ============================================================ */

(function initSettingsValidation() {
    var saveBtn         = document.querySelector('.settings-save-btn');
    var emailInput      = document.querySelector('#settings-email');
    var currentPass     = document.querySelector('#settings-current-password');
    var newPass         = document.querySelector('#settings-new-password');
    var confirmPass     = document.querySelector('#settings-confirm-password');

    if (!saveBtn) return;

    function validateSettingsEmail() {
        if (!emailInput) return true;
        var val = emailInput.value.trim();
        if (val && !isValidEmail(val)) {
            showError(emailInput, 'Enter a valid email address');
            return false;
        }
        if (val) showSuccess(emailInput);
        return true;
    }

    function validateSettingsPassword() {
        var cur  = currentPass  ? currentPass.value  : '';
        var next = newPass      ? newPass.value       : '';
        var conf = confirmPass  ? confirmPass.value   : '';

        if (!cur && !next && !conf) return true;

        var valid = true;

        if (!cur) {
            showError(currentPass, 'Current password is required to change password');
            valid = false;
        } else {
            showSuccess(currentPass);
        }

        if (!next) {
            showError(newPass, 'New password is required');
            valid = false;
        } else if (!isStrongPassword(next)) {
            showError(newPass, 'Min 8 chars, 1 uppercase letter, 1 number');
            valid = false;
        } else {
            showSuccess(newPass);
        }

        if (!conf) {
            showError(confirmPass, 'Please confirm your new password');
            valid = false;
        } else if (conf !== next) {
            showError(confirmPass, 'Passwords do not match');
            valid = false;
        } else {
            showSuccess(confirmPass);
        }

        return valid;
    }

    if (emailInput)  emailInput.addEventListener('blur', validateSettingsEmail);
    if (newPass)     newPass.addEventListener('blur', validateSettingsPassword);
    if (confirmPass) confirmPass.addEventListener('blur', validateSettingsPassword);

    [emailInput, currentPass, newPass, confirmPass].forEach(function(input) {
        if (input) input.addEventListener('input', function() { clearError(input); });
    });

    saveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var emailOk = validateSettingsEmail();
        var passOk  = validateSettingsPassword();

        if (!emailOk || !passOk) {
            showToast('Please fix the errors before saving.');
            return;
        }
        showToast('Settings saved successfully!', 'success');
    });
}());

/* Main JavaScript for VerifyPro */

document.addEventListener('DOMContentLoaded', () => {
    // Check for login toast
    if (window.location.href.includes('hr-dashboard') && localStorage.getItem('justLoggedIn') === 'true') {
        showToast();
        localStorage.removeItem('justLoggedIn');
    }
});

/* Login Page Logic */
function switchLoginTab(role) {
    const btns = document.querySelectorAll('.tab-btn');
    const emailLabel = document.getElementById('emailLabel');
    const submitBtn = document.getElementById('submitBtn');

    btns.forEach(btn => btn.classList.remove('active'));

    if (role === 'hr') {
        btns[0].classList.add('active');
        emailLabel.textContent = 'Organization Email Address';
        submitBtn.textContent = 'Sign In to HR Portal';
    } else {
        btns[1].classList.add('active');
        emailLabel.textContent = 'Email Address';
        submitBtn.textContent = 'Sign In to Candidate Portal';
    }
}

function handleLogin(e) {
    e.preventDefault();
    // Mock login logic
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Redirect logic
        localStorage.setItem('justLoggedIn', 'true');
        if (originalText.includes('HR')) {
            window.location.href = 'hr-dashboard.html';
        } else {
            alert('Candidate Portal is under construction. Please use HR Portal for this demo.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1000);
}

/* Dashboard Logic */
function openModal(candidateId) {
    const modal = document.getElementById('verificationModal');
    if (modal) {
        modal.classList.add('active');
        // In a real app, fetch data for candidateId
        console.log('Opening details for', candidateId);
    }
}

function closeModal() {
    const modal = document.getElementById('verificationModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal on outside click
window.onclick = function (event) {
    const modal = document.getElementById('verificationModal');
    if (event.target === modal) {
        closeModal();
    }
}

/* Utilities */
function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
}

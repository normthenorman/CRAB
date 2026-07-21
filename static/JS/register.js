const passwordfield = document.getElementById('pass');
const confirmPasswordfield = document.getElementById('pass1');
const emailfield = document.getElementById('email');

passwordfield.classList.add('hidden-field');
confirmPasswordfield.classList.add('hidden-field')

if (emailfield && confirmPasswordfield && passwordfield) {
    emailfield.addEventListener('input', () => {
        passwordfield.classList.remove('hidden-field');
        confirmPasswordfield.classList.remove('hidden-field');
    });
}
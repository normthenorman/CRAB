const passwordfield = document.getElementById('pass');
const confirmPasswordfield = document.getElementById('pass1');
const emailfield = document.getElementById('email');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button')

passwordfield.style.display = 'none';
confirmPasswordfield.style.display = 'none';
submitButton.style.display = 'none';
backButton.style.display = 'none'

nextButton.addEventListener('click', () => {
    passwordfield.style.display = '';
    confirmPasswordfield.style.display = '';
    submitButton.style.display = '';
    backButton.style.display = '';
    emailfield.style.display = 'none';
    nextButton.style.display = 'none';
})

backButton.addEventListener('click', () => {
    passwordfield.style.display = 'none';
    confirmPasswordfield.style.display = 'none';
    submitButton.style.display = 'none';
    backButton.style.display = 'none';
    emailfield.style.display = '';
    nextButton.style.display = '';
})
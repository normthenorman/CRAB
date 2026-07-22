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

// // // // // // // // // // // // // // // // // // // // // // // //  

const turnOffButton = document.getElementById('turn_off');
const turnOnButton = document.getElementById('turn_on');
// just made duplicates cause i can't code
const turnOffButton1 = document.getElementById('turn_off1');
const turnOnButton1 = document.getElementById('turn_on1');
const input = document.getElementById('pass');
const input1 = document.getElementById('pass1')
const next = document.getElementById('next-button');
const back = document.getElementById('back-button');

// all buttons here:
turnOffButton.style.display = 'none'
turnOnButton.style.display = 'none'

turnOffButton1.style.display = 'none'
turnOnButton1.style.display = 'none'

next.addEventListener('click', () => {
    turnOffButton.style.display = ''
    turnOnButton.style.display = ''

    turnOffButton1.style.display = ''
    turnOnButton1.style.display = ''
});

back.addEventListener('click', () => {
    turnOffButton.style.display = 'none'
    turnOnButton.style.display = 'none'

    turnOffButton1.style.display = 'none'
    turnOnButton1.style.display = 'none'    
});

turnOnButton.style.display = 'none';              
                                                  
turnOffButton.addEventListener('click', () => {
    input.type = 'text'
    turnOffButton.style.display = 'none'
    turnOnButton.style.display = '';
});                    

turnOnButton.addEventListener('click', () => {
    input.type = 'password'
    turnOffButton.style.display = ''
    turnOnButton.style.display = 'none';
});      


turnOnButton1.style.display = 'none';              
                                                  
turnOffButton1.addEventListener('click', () => {
    input1.type = 'text'
    turnOffButton1.style.display = 'none'
    turnOnButton1.style.display = '';
});                    

turnOnButton1.addEventListener('click', () => {
    input1.type = 'password'
    turnOffButton1.style.display = ''
    turnOnButton1.style.display = 'none';
});      

// for some reason the top one controls the bottom one and vice versa
// will fix later, maybe never
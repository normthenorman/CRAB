const turnOffButton = document.getElementById('turn_off');
const turnOnButton = document.getElementById('turn_on');
const input = document.getElementById('password');
                                                  
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
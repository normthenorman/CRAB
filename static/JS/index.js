const button = document.getElementById('kaput');
const thing_to_be_kaputted = document.getElementById('kablow');

button.addEventListener("click", even => {
    thing_to_be_kaputted.style.display = 'none';        //this kaputs stuff 
})

// // // // // // // // // // // // // // // // //

function maskEmail(email, symbol = '@', replacement = '*') {
    const index = email.indexOf(symbol);
    if (index <= 0) return email; // no symbol found, or it's the first char

    const first = email.slice(0, 4);
    const maskedPart = replacement.repeat(index - 1); // chars between first char and symbol
    const rest = email.slice(index); // includes '@' and domain

    return first + maskedPart + rest;
}
document.getElementById('placeholder').innerHTML = maskEmail(email.email , '@');

// // // // // // // // // // // // // // // // //
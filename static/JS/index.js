const button = document.getElementById('kaput');
const thing_to_be_kaputted = document.getElementById('kablow');

button.addEventListener("click", even => {
    thing_to_be_kaputted.style.display = 'none';        //this kaputs stuff
})
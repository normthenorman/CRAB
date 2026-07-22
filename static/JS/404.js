const suggestionPlaceholder = document.getElementById('suggestion');
const possibleSuggestions = [
    "check if the username you typed is correct", 
    "it's time for a rebrand. Claim that username ",
    "that user deleted their account. Ew, who would delete a Crab page?",
    "this Crab didn't exist...ever. Scary to think about, right?",
    "this Crab doesn't exist... yet, claim that username ",
    "this was meant to be. Claim this username ",
    "that person went outside. Couldn't be me... or you"
]
const randomSuggestion = possibleSuggestions[Math.floor(Math.random() * possibleSuggestions.length)]
const linkPlaceholder = document.getElementById('linkPlaceholder')

linkPlaceholder.style.display = 'none'

suggestionPlaceholder.innerHTML = randomSuggestion

if (randomSuggestion == possibleSuggestions[1] || randomSuggestion == possibleSuggestions[4] || randomSuggestion == possibleSuggestions[5]) {
    linkPlaceholder.style.display = ''
}
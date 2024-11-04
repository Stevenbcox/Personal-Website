const quotes = [
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "You are never too old to set another goal or to dream a new dream.",
    "The best and most beautiful things in the world cannot be seen or even touched. They must be felt with the heart.",

];

let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', function () {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map((word) => `<span>${word} </span>`);
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';

    typedValueElement.value = '';
    typedValueElement.focus();
    typedValueElement.readOnly = false;

    startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const timeInSeconds = elapsedTime / 1000;
        const wpm = (words.length / timeInSeconds) * 60;
        const message = `CONGRATULATIONS! You finished in ${timeInSeconds.toFixed(2)} seconds.\nYour WPM is ${wpm.toFixed(2)}.`;
        messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';
        typedValueElement.readOnly = false;
    } else {
        // error state: disable further input without removing any characters
        typedValueElement.className = 'error';
        typedValueElement.readOnly = true;
    }
});

typedValueElement.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        typedValueElement.readOnly = false; // Allow correction on backspace
        typedValueElement.className = ''; // Remove error styling
    }
});

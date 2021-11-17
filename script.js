const words = [
    { id: 1, word: "appraise", wordsShown: 6 },
    { id: 2, word: "acquiesce", wordsShown: 6 },
    { id: 3, word: "acumen", wordsShown: 5 },
    { id: 4, word: "belligerent", wordsShown: 8 },
    { id: 5, word: "boisterous", wordsShown: 8 },
    { id: 6, word: "cessation", wordsShown: 6 },
    { id: 7, word: "circumspect", wordsShown: 6 },
    { id: 8, word: "discombobulate", wordsShown: 8 },
    { id: 9, word: "allegory", wordsShown: 6 },
    { id: 10, word: "ambivalent", wordsShown: 8 },
    { id: 11, word: "nonplussed", wordsShown: 7 }
];

const guessesLeft = document.getElementById("guesses-left");
const winAlert = document.querySelector(".win-alert");
const changeButton = document.querySelector(".change");

// Create words
const wordSetup = loadWord();

// Output to game
ouputHangmanGame(wordSetup);

const inputEl = document.querySelectorAll(".inputEntry");

function loadWord() {
    // Generate a random word;
    const randomSelect = words[Math.floor(Math.random() * words.length)];
    const randomWord = randomSelect.word;

    let blankWordsIndex = [];

    for (let i = 0; i < randomSelect.wordsShown; i++) {
        let randomIndexNo = Math.floor(Math.random() * randomWord.length);
        blankWordsIndex.push(randomIndexNo);
    }

    const arrayOfEachWord = randomWord.split("");

    blankWordsIndex = blankWordsIndex.filter((num, index) => {
        return blankWordsIndex.indexOf(num) === index;
    });

    return [randomWord, blankWordsIndex.sort((a, b) => a - b), arrayOfEachWord];
}

function ouputHangmanGame(wordSetup) {
    const numberOfWords = wordSetup[2].length;

    console.log(wordSetup);
    document.documentElement.style.setProperty('--numberOfWords', String(numberOfWords));

    for (let i = 0; i < numberOfWords; i++) {
        document.querySelector(".blanks").insertAdjacentHTML("beforeend", `<input type="text" class="inputEntry" placeholder="*" maxlength="1">`);
    }
    const inputEl = document.querySelectorAll(".inputEntry");

    inputEl.forEach((input, index) => {
        for (let i = 0; i < wordSetup[1].length; i++) {
            if (index === wordSetup[1][i]) {
                input.value = wordSetup[2][index]
            }
        }
    });
}

function checkInput(input, value, id) {
    let livesLeft = Number(guessesLeft.textContent);
    if (value !== wordSetup[2][id]) {
        input.style.borderBottom = "2px solid red";
        livesLeft -= 1;
        guessesLeft.textContent = livesLeft;
    } else {
        input.style.borderBottom = "2px solid green";
    }
}

inputEl.forEach((input, index) => {
    input.addEventListener("change", () => {
        checkInput(input, input.value, index);
        if (Array.from(inputEl).every(input => input.value !== "")) {

            if (Array.from(inputEl).some(input => input.style.borderBottom === "2px solid red")) null
            else {
                winAlert.classList.add("popup");
                setTimeout(() => {
                    if (confirm("Move to next?")) {
                        location.reload();
                    }
                }, 1500);
            }
        }
    });

    input.addEventListener("focus", (e) => {
        e.target.style.borderBottom = "2px solid rgb(105, 27, 105)";
    });

    input.addEventListener("blur", (e) => {
        checkInput(e.target, e.target.value, index);
    });
});







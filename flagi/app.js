// Tablica flag i odpowiadających im krajów
const countries = [
    {
        name: 'Polska',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg'
    },
    {
        name: 'Niemcy',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg'
    },
    {
        name: 'Francja',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg'
    },
    {
        name: 'Wielka Brytania',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_Kingdom.svg'
    },
    {
        name: 'Włochy',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg'
    }
];

let currentFlag = {};
let answers = [];

function getRandomFlag() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    currentFlag = countries[randomIndex];

    // Losowanie odpowiedzi
    answers = [currentFlag];
    while (answers.length < 4) {
        const randomAnswer = countries[Math.floor(Math.random() * countries.length)];
        if (!answers.includes(randomAnswer)) {
            answers.push(randomAnswer);
        }
    }

    // Mieszanie odpowiedzi
    answers = shuffleArray(answers);

    // Ustawianie flagi
    document.getElementById('flag').src = currentFlag.flag;

    // Ustawianie odpowiedzi w przyciskach
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        btn.textContent = answers[index].name;
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect');
    });

    // Resetowanie wyniku
    document.getElementById('result').textContent = '';
}

function checkAnswer(index) {
    const selectedAnswer = answers[index];
    const answerButtons = document.querySelectorAll('.answer-btn');

    if (selectedAnswer === currentFlag) {
        answerButtons[index].classList.add('correct');
        document.getElementById('result').textContent = 'Brawo! Zgadłeś poprawnie!';
        document.getElementById('result').classList.add('correct');
    } else {
        answerButtons[index].classList.add('incorrect');
        document.getElementById('result').textContent = 'Niestety, spróbuj ponownie!';
        document.getElementById('result').classList.add('incorrect');
    }

    // Zablokowanie przycisków po odpowiedzi
    answerButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Przycisk na nową rundę
    setTimeout(getRandomFlag, 2000);
}

// Funkcja do mieszania tablicy
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Inicjalizacja gry
getRandomFlag();

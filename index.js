const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let startTime, endTime, timerInterval;
var urlParams = new URLSearchParams(window.location.search);
var playerName = urlParams.get('playerName');
var pairs = urlParams.get('pairs');

// מעבר לקריאת הקובץ JSON ישירות בג'אווה סקריפט
const cardData = [
    {
        "image": "./images/blue.jpg",
        "name": "blue"
    },
    {
        "image": "./images/whit.jpg",
        "name": "whit"
    },
    {
        "image": "./images/difpink.jpg",
        "name": "difpink"
    },
    {
        "image": "./images/jentel.jpg",
        "name": "jentel"
    },
    {
        "image": "./images/oreng.jpg",
        "name": "oreng"
    },
    {
        "image": "./images/oyr.jpg",
        "name": "oyr"
    },
    {
        "image": "./images/pink.jpg",
        "name": "pink"
    },
    {
        "image": "./images/perpul.jpg",
        "name": "perpul"
    },
    {
        "image": "./images/red.jpg",
        "name": "red"
    },
    {
        "image": "./images/yello.jpg",
        "name": "yello"
    },
    {
        "image": "./images/thelet.jpg",
        "name": "thelet"
    },
    {
        "image": "./images/ppw.jpg",
        "name": "ppw"
    },
    //צריך להוסיף קלפים חדשים מפה אני משכפל!!!!
    {
        "image": "./images/blue.jpg",
        "name": "blue"
    },
    {
        "image": "./images/whit.jpg",
        "name": "whit"
    },
    {
        "image": "./images/difpink.jpg",
        "name": "difpink"
    },
    {
        "image": "./images/jentel.jpg",
        "name": "jentel"
    },
    {
        "image": "./images/oreng.jpg",
        "name": "oreng"
    },
    {
        "image": "./images/oyr.jpg",
        "name": "oyr"
    },
    {
        "image": "./images/pink.jpg",
        "name": "pink"
    },
    {
        "image": "./images/perpul.jpg",
        "name": "perpul"
    },
    {
        "image": "./images/red.jpg",
        "name": "red"
    },
    {
        "image": "./images/yello.jpg",
        "name": "yello"
    },
    {
        "image": "./images/thelet.jpg",
        "name": "thelet"
    },
    {
        "image": "./images/ppw.jpg",
        "name": "ppw"
    },
    {
        "image": "./images/blue.jpg",
        "name": "blue"
    },
    {
        "image": "./images/whit.jpg",
        "name": "whit"
    },
    {
        "image": "./images/difpink.jpg",
        "name": "difpink"
    },
    {
        "image": "./images/jentel.jpg",
        "name": "jentel"
    },
    {
        "image": "./images/oreng.jpg",
        "name": "oreng"
    },
    {
        "image": "./images/oyr.jpg",
        "name": "oyr"
    },
];

// יצירת קרטים מהקובץ JSON
if (pairs) {
    const selectedCards = cardData.slice(0, pairs);
    cards = [...selectedCards, ...selectedCards];
}
else {
    cards = [...cardData, ...cardData];
    
}
shuffleCards();
generateCards();
startTimer();

function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
            <div class="front">
                <img class="front-image" src=${card.image} />
            </div>
            <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
    checkForWin(); // קריאה לפונקציה checkForWin לאחר סיום המהלך
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
        checkForWin(); // קריאה לפונקציה checkForWin לאחר סיום המהלך
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    startTime = new Date();
    gridContainer.innerHTML = "";
    generateCards();
    startTimer(); 
}
document.getElementById("restartButton").addEventListener("click", restart);

document.querySelector(".score").textContent = score;
if(playerName){
  document.getElementById("welcomeMessage").innerText = "Good luck " + playerName + "!" + " You have " + pairs + " pairs!";
}

function checkForWin() {
    const allCards = document.querySelectorAll('.card');
    const flippedCards = document.querySelectorAll('.flipped');
   

    if (flippedCards.length === allCards.length && flippedCards.length % 2 === 0) {
        endTime = new Date();
        stopTimer(); 
        showCongratulationsPopup();
    }
}

function showCongratulationsPopup() {
    alert("כל הכבוד! סיימת את המשחק!");
}


function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds

    // Format elapsed time as minutes and seconds
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    // Display the formatted time
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

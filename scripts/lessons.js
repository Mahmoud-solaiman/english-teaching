import {showInstructions} from './instructions.js';

showInstructions();

const flipCard = document.querySelector('.flip-card');
const learnedCards = [];//To track how many cards have been learned for the progress bar
const lessonNumber = document.title.at(-1);//To get the lesson number from the title
let cards;//The variable that'll store all the cards

//fetch the data from the json file and then render the first card
fetch(`../data/lesson${lessonNumber}.json`)
  .then(res => res.json())
  .then(data => {
    cards = data;
    renderFirstCard(); 
    flipCardFunc();
  });

function renderFirstCard() {
  flipCard.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="img-container">
          <img src="${cards[0].front.image}" alt="${cards[0].front.sentence}">
        </div>
        <audio controls>
          <source src="${cards[0].front.audio}">
        </audio>
        <p class="card-text">${cards[0].front.sentence}</p>
        <button title="click the button to flip card" class="flip-btn js-flip-btn">Flip</button>
      </div>
      <div class="flip-card-back">
        <p class="answer">${cards[0].back.answer}</p>
        <audio controls>
          <source src="${cards[0].back.audio}">
        </audio>
        <button class="flip-back-btn flip-btn">Flip</button>
      </div>
    </div>
  `;
  learnedCards.push(cards[0].front.sentence);
}

//Function to handle the card's flipping functionality
function flipCardFunc() {
  const flipBtns = document.querySelectorAll('.js-flip-btn');
  const flipBackBtns = document.querySelectorAll('.flip-back-btn');

  flipBtns.forEach(flipBtn => {
    flipBtn.addEventListener('pointerup', () => {
      flipBtn.parentElement.parentElement.classList.add('flipped-card');
    });
  });

  flipBackBtns.forEach(flipBackBtn => {
    flipBackBtn.addEventListener('pointerup', () => {
      flipBackBtn.parentElement.parentElement.classList.remove('flipped-card');
    });
  });
}

//Function to render new cards dynamically when clicking or pressing the left and right arrows
function renderNewCard(addCard, cardNumber, animate, element1, element2) {
  //The container for each card
  const flipCardInner = document.createElement('div');
  flipCardInner.classList.add('flip-card-inner');
  //The HTML for each card
  flipCardInner.innerHTML = `
    <div class="flip-card-front">
      <div class="img-container">
        <img src="${cards[cardNumber].front.image}" alt="${cards[cardNumber].front.sentence}">
      </div>
      <audio controls>
        <source src="${cards[cardNumber].front.audio}">
      </audio>
      <p class="card-text">${cards[cardNumber].front.sentence}</p>
      <button title="click the button to flip card" class="flip-btn js-flip-btn">Flip</button>
    </div>
    <div class="flip-card-back">
      <p class="answer">${cards[cardNumber].back.answer}</p>
      <audio controls>
        <source src="${cards[cardNumber].back.audio}">
      </audio>
      <button class="flip-back-btn flip-btn">Flip</button>
    </div>
  `;
  //appending or prepending a card depending on which button has been triggered
  addCard(flipCardInner);
  //execute the flipCardFunc to handle the newly added buttons
  flipCardFunc();
  //To handle the sliding effect of the cards when appending or prepending
  const flipCardsInner = document.querySelectorAll('.flip-card-inner');
  setTimeout(() => {
    flipCardsInner.forEach(flipCardInner => {
      flipCardInner.classList.add(`${animate}`);
    });
    
    setTimeout(() => {
      flipCardsInner[element1].classList.remove(`${animate}`);
      flipCardsInner[element2].remove();
    }, 100);
  }, 5);
  
  //Tracking how many cards have been learned and updating the progress bar accordingly
  const progressBar = document.querySelector('.progress-bar-inner');
  const progressPercentage = document.querySelector('.progress-percentage');

  if(learnedCards.indexOf(cards[cardNumber].front.sentence) === -1) {
    let cardsNumber = learnedCards.length + 1;
    learnedCards.push(cards[cardNumber].front.sentence);
    progressBar.style.width = `${(cardsNumber) * 10}%`;
    progressPercentage.innerText = `${(cardsNumber) * 10}%`;
  }
}

const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');
let cardNumber = 0;

//rightBtn eventListener
rightBtn.addEventListener('pointerup', () => {
  cardNumber++;
  if(cardNumber > 9) {
    cardNumber = 0;
  }
  renderNewCard(flipCard.append.bind(flipCard), cardNumber, 'animate-in', 1, 0);  
});

//leftBtn eventListener
leftBtn.addEventListener('pointerup', () => {
  cardNumber--;
  if(cardNumber < 0) {
    cardNumber = 9;
  }
  renderNewCard(flipCard.prepend.bind(flipCard), cardNumber, 'animate-out', 0, 1);
});
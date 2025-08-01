import {showInstructions} from './instructions.js';
import { cardHTML } from './cardHTML.js';
import { flipCardKeyboard, playAudioKeyboard, navigateLessonKeyboard } from './keyboard-navigations.js';
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
      ${cardHTML(
        cards[0].front.image,
        cards[0].front.sentence,
        cards[0].front.audio,
        cards[0].back.answer,
        cards[0].back.audio
      )}
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
export function renderNewCard(addCard, cardNumber, animate, element1, element2) {
  //The container for each card
  const flipCardInner = document.createElement('div');
  flipCardInner.classList.add('flip-card-inner');
  //The HTML for each card
  flipCardInner.innerHTML = `
    ${cardHTML(
        cards[cardNumber].front.image,
        cards[cardNumber].front.sentence,
        cards[cardNumber].front.audio,
        cards[cardNumber].back.answer,
        cards[cardNumber].back.audio
      )}
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
  trackProgress(cards[cardNumber].front.sentence);
}

function trackProgress(sentence) {
  //Tracking how many cards have been learned and updating the progress bar accordingly
  const progressBar = document.querySelector('.progress-bar-inner');
  const progressPercentage = document.querySelector('.progress-percentage');

  if(learnedCards.indexOf(sentence) === -1) {
    let cardsNumber = learnedCards.length + 1;
    learnedCards.push(sentence);
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

//Handle keyboard navigations and interactions
function changeCardKeyboard() {
  window.addEventListener('keyup', e => {
    if(e.key === 'ArrowRight') {
      cardNumber++;
      if(cardNumber > 9) {
        cardNumber = 0;
      }
      renderNewCard(flipCard.append.bind(flipCard), cardNumber, 'animate-in', 1, 0);  
    }
    if(e.key ==='ArrowLeft') {
      cardNumber--;
      if(cardNumber < 0) {
        cardNumber = 9;
      }
      renderNewCard(flipCard.prepend.bind(flipCard), cardNumber, 'animate-out', 0, 1);
    }
  });
}

flipCardKeyboard();
playAudioKeyboard();
changeCardKeyboard();
navigateLessonKeyboard();
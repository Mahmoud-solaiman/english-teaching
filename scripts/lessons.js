import {showInstructions} from './instructions.js';
import { flipCardKeyboard, playAudioKeyboard, navigateLessonKeyboard } from './keyboard-navigations.js';
import { renderFirstCard, flipCardFunc, renderNewCard, trackProgress} from './cards.js';

showInstructions();

const flipCard = document.querySelector('.flip-card');
const lessonNumber = document.title.at(-1);//To get the lesson number from the title
let cards;//The variable that'll store all the cards
const cardsInReview = JSON.parse(localStorage.getItem('cardsInReview')) || [];

//fetch the data from the json file and then render the first card
fetch(`../data/lesson${lessonNumber}.json`)
  .then(res => res.json())
  .then(data => {
    cards = data;
    renderFirstCard(cards); 
    flipCardFunc();
  });

const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');
let cardNumber = 0;

//rightBtn eventListener
rightBtn.addEventListener('pointerup', () => {
  cardNumber++;
  if(cardNumber > 9) {
    cardNumber = 0;
  }
  renderNewCard(flipCard.append.bind(flipCard), cardNumber, 'animate-in', 1, 0, cards);  
  trackProgress(cards[cardNumber].front.sentence);
});

//leftBtn eventListener
leftBtn.addEventListener('pointerup', () => {
  cardNumber--;
  if(cardNumber < 0) {
    cardNumber = 9;
  }
  renderNewCard(flipCard.prepend.bind(flipCard), cardNumber, 'animate-out', 0, 1, cards);
  trackProgress(cards[cardNumber].front.sentence);
});

//Function to add card to the review page
const addToReviewBtn = document.querySelector('.add-to-review');
addToReviewBtn.addEventListener('pointerup', () => {
  const isCard = cardsInReview.some(card => {
    return card.front.sentence === cards[cardNumber].front.sentence
  }); // Check if the card is already in review or not and then return true or false
  if(!isCard) {
    const date = new Date();
    const reviewCard = {
        ...cards[cardNumber],
        addTime: date.getTime(),
        interval: 0,
        timesOfReview: 0
    };
    cardsInReview.push(reviewCard);
    localStorage.setItem('cardsInReview', JSON.stringify(cardsInReview));
    handleAddMessage('Card was added successfully!');

  } else if(isCard) {
    handleAddMessage('Card was already added.');
  }
});

function handleAddMessage(message) {
  const addMessage = document.querySelector('.card-added');
  addMessage.innerText = `${message}`;
  addMessage.style.opacity = '1'; 
  setTimeout(() => {
    addMessage.style.opacity = '0'; 
  }, 1300);
}

//Handle keyboard navigations and interactions
function changeCardKeyboard() {
  window.addEventListener('keyup', e => {
    if(e.key === 'ArrowRight') {
      cardNumber++;
      if(cardNumber > 9) {
        cardNumber = 0;
      }
      renderNewCard(flipCard.append.bind(flipCard), cardNumber, 'animate-in', 1, 0, cards);  
      trackProgress(cards[cardNumber].front.sentence);
    }
    if(e.key ==='ArrowLeft') {
      cardNumber--;
      if(cardNumber < 0) {
        cardNumber = 9;
      }
      renderNewCard(flipCard.prepend.bind(flipCard), cardNumber, 'animate-out', 0, 1, cards);
      trackProgress(cards[cardNumber].front.sentence);
    }
  });
}

flipCardKeyboard();
playAudioKeyboard();
changeCardKeyboard();
navigateLessonKeyboard();
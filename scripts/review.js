import { renderFirstCard, flipCardFunc, renderNewCard } from "./cards.js";
import { flipCardKeyboard, playAudioKeyboard } from "./keyboard-navigations.js";
import { handleIntervals, difficultIntervalsChecks, goodIntervalsChecks, easyIntervalsChecks } from "./intervals.js";

const cardsInReview = JSON.parse(localStorage.getItem('cardsInReview')) || [];
let cardNumber = 0;

//Add the cards that are due for revision to be rendered to the page
const dueCards = cardsInReview.filter(card => {
  return (new Date().getTime() - card.addTime)/1000/60 >= card.interval;
});

//Remove the cards that are due for revision from the orignal array
cardsInReview.forEach(() => {
  dueCards.forEach((dueCard) => {
    const index = cardsInReview.indexOf(dueCard);
    if(index >= 0) {
      cardsInReview.splice(index, 1);
    }
  });
});

const flipCard = document.querySelector('.flip-card');

if(dueCards.length >= 1) {
  //card functions
  renderFirstCard(dueCards);
  flipCardFunc();
  renderIntervals();
  flipCardKeyboard();
  playAudioKeyboard();
  handleIntervals(dueCards, cardNumber);

  //Handle intervals
  handleAgain();
  handleDifficult();
  handleGood();
  handleEasy();
}

//Function to generate intervals onto the page
function renderIntervals() {
  const intervalsHTMLObject = {
    intervalsArr: ['Again', 'Difficult', 'Good', 'Easy'],
    intervalsValues: ['1m', '5m', '10m', '15m']
  };
  let intervalsHTML = '';
  intervalsHTMLObject.intervalsArr.forEach(interval => {
    intervalsHTML += `
      <div class="${interval.toLowerCase()}-interval-container">
        <span class="${interval.toLowerCase()}-interval-time">
        ${
          intervalsHTMLObject.intervalsValues[intervalsHTMLObject.intervalsArr.indexOf(interval)]
        }</span>
        <button class="${interval.toLowerCase()}">${interval}</button>
      </div>
    `;
  });

  document.querySelector('.intervals-container').innerHTML = intervalsHTML;
}

//Intervals
//The again interval
function renderNextCard() {
  cardNumber++;
  if(cardNumber === dueCards.length) {
    cardNumber = 0;
  }
  renderNewCard(flipCard.append.bind(flipCard), cardNumber, 'animate-in', 1, 0, dueCards);  
}

function handleAgain() {
  const againBtn = document.querySelector('.again');
  againBtn.addEventListener('pointerup', () => {
    dueCards[cardNumber].interval = 0;
    dueCards[cardNumber].addTime = new Date().getTime();
    intervalsFunc();
  });
}

//The difficult interval
function handleDifficult() {
  const difficultBtn = document.querySelector('.difficult');
  const difficultInterval = document.querySelector('.difficult-interval-time');
  difficultBtn.addEventListener('pointerup', () => {
    difficultIntervalsChecks(difficultInterval, dueCards, cardNumber, cardsInReview);
    updatePage();
    if(dueCards.length > 0) {
      intervalsFunc();
    }
  });
}

//The good interval 
function handleGood() {
  const goodBtn = document.querySelector('.good');
  const goodInterval = document.querySelector('.good-interval-time');
  goodBtn.addEventListener('pointerup', () => {
    goodIntervalsChecks(goodInterval, dueCards, cardNumber, cardsInReview);
    updatePage();
    if(dueCards.length > 0) {
      intervalsFunc();
    }
  });
}

//The easy interval 
function handleEasy() {
  const easyBtn = document.querySelector('.easy');
  const easyInterval = document.querySelector('.easy-interval-time');
  easyBtn.addEventListener('pointerup', () => {
    easyIntervalsChecks(easyInterval, dueCards, cardNumber, cardsInReview);
    updatePage();
    if(dueCards.length > 0) {
      intervalsFunc();
    }
  });
}

//Handle the intervals functionality
function intervalsFunc() {
  renderNextCard();
  handleIntervals(dueCards, cardNumber);
}

//update page
function updatePage() {
  if(dueCards.length === 0) {
    flipCard.innerHTML = "Good job! You're done with your reviews for now.";
    document.querySelector('.intervals-container').style.display = 'none'; 
  }
}

//keyBoard events 
window.addEventListener('keydown', e => {
  if(e.key === '1') {
    dueCards[cardNumber].interval = 0;
    dueCards[cardNumber].addTime = new Date().getTime();
    intervalsFunc();
    
  } if(e.key === '2') {
    const difficultInterval = document.querySelector('.difficult-interval-time');
    difficultIntervalsChecks(difficultInterval, dueCards, cardNumber, cardsInReview);
    renderNextCard();
    handleIntervals(dueCards, cardNumber);

  } if(e.key === '3') {
    const goodInterval = document.querySelector('.good-interval-time');
    goodIntervalsChecks(goodInterval, dueCards, cardNumber, cardsInReview);
    renderNextCard();
    handleIntervals(dueCards, cardNumber);

  } if(e.key === '4') {
    const easyInterval = document.querySelector('.easy-interval-time');
    easyIntervalsChecks(easyInterval, dueCards, cardNumber, cardsInReview);
    renderNextCard();
    handleIntervals(dueCards, cardNumber);
  }
});
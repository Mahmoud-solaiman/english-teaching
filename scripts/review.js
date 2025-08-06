import { renderFirstCard, flipCardFunc, renderNewCard } from "./cards.js";
import { flipCardKeyboard, playAudioKeyboard } from "./keyboard-navigations.js";
const cardsInReview = JSON.parse(localStorage.getItem('cardsInReview')) || [];
const flipCard = document.querySelector('.flip-card');

if(cardsInReview.length >= 1) {
  renderFirstCard(cardsInReview);
  flipCardFunc();
  renderIntervals();
  flipCardKeyboard();
  playAudioKeyboard();
  handleIntervals();
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

//Function to handle the many different intervals in different scenarios
function handleIntervals() {
  const againBtn = document.querySelector('.again');
  const difficultBtn = document.querySelector('.difficult');
  const goodBtn = document.querySelector('.good');
  const easyBtn = document.querySelector('.easy');
}
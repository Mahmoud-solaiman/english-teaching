import { cardHTML } from "./cardHTML.js";

const learnedCards = [];
export function renderFirstCard(cards) {
  const flipCard = document.querySelector('.flip-card');

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

export function flipCardFunc() {
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

export function renderNewCard(addCard, cardNumber, animate, element1, element2, cards) {
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

export function trackProgress(sentence) {
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
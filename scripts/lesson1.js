const flipCard = document.querySelector('.flip-card');
const learnedCards = [];

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

renderFirstCard();
flipCardFunc();

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

function renderNewCard(addCard, cardNumber, animate, element1, element2) {
  const flipCardInner = document.createElement('div');
  flipCardInner.classList.add('flip-card-inner');
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
  addCard(flipCardInner)
  flipCardFunc();
  
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

rightBtn.addEventListener('pointerup', () => {
  cardNumber++;
  if(cardNumber > 9) {
    cardNumber = 0;
  }
  renderNewCard(flipCard.append.bind(flipCard), cardNumber, 'animate-in', 1, 0);  
});

leftBtn.addEventListener('pointerup', () => {
  cardNumber--;
  if(cardNumber < 0) {
    cardNumber = 9;
  }
  renderNewCard(flipCard.prepend.bind(flipCard), cardNumber, 'animate-out', 0, 1);
});
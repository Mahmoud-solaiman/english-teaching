const flipBtns = document.querySelectorAll('.js-flip-btn');
const flipCardInner = document.querySelector('.flip-card-inner');
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

const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');

rightBtn.addEventListener('pointerup', () => {
  flipCardInner.style.transform = 'translateX(110%)';
});

leftBtn.addEventListener('pointerup', () => {
  flipCardInner.style.transform = 'translateX(-110%)';
});
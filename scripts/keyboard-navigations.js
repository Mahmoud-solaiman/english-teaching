export function flipCardKeyboard() {
  window.addEventListener('keyup', e => {
    if(e.key === 'f') {
      const flipCardInner = document.querySelector('.flip-card-inner');
      if(flipCardInner.classList.contains('flipped-card')) {
        flipCardInner.classList.remove('flipped-card');
      } else {
        flipCardInner.classList.add('flipped-card');
      }
    }
  });
}

export function playAudioKeyboard() {
  window.addEventListener('keyup', e => {
    const flipCardInner = document.querySelector('.flip-card-inner');
    if(e.key === ' ' && !flipCardInner.classList.contains('flipped-card')) {
      const audio = document.querySelector('.front-audio');
      audio.play();
    } 
    if(e.key === ' ' && flipCardInner.classList.contains('flipped-card')) {
      const audio = document.querySelector('.back-audio');
      audio.play();
    }
  });
}

export function navigateLessonKeyboard() {
  window.addEventListener('keyup', e => {
    if(e.key === 'n') {
      document.querySelector('.next-lesson-btn').click();
    }
    if(e.key === 'p') {
      document.querySelector('.previous-lesson-btn').click();
    }
  });
}
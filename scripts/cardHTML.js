export function cardHTML(image, sentence, frontAudio, answer, backAudio) {
  return `
    <div class="flip-card-front">
      <div class="img-container">
        <img src="${image}" alt="${sentence}">
      </div>
      <audio controls class="front-audio" title="press space to play audio">
        <source src="${frontAudio}">
      </audio>
      <p class="card-text">${sentence}</p>
      <button title="click or press f to flip card" class="flip-btn js-flip-btn">Flip</button>
    </div>
    <div class="flip-card-back">
      <p class="answer">${answer}</p>
      <audio controls class="back-audio" title="press space to play audio">
        <source src="${backAudio}">
      </audio>
      <button title="click or press f to flip card" class="flip-back-btn flip-btn">Flip</button>
    </div>
  `;
}
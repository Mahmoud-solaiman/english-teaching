const instructionsBtn = document.querySelector('.instructions-btn');
const exitBtn = document.querySelector('.exit');
const instructionsTab = document.querySelector('.instructions-tab')

instructionsBtn.addEventListener('pointerup', ()=>{
  instructionsTab.classList.add('show-instructions');
});

exitBtn.addEventListener('pointerup', ()=>{
  instructionsTab.classList.remove('show-instructions');
});
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-links');


hamburgerMenu.addEventListener('pointerup', e => {
  if (getComputedStyle(navList).getPropertyValue('height') === '0px') {
    navList.style.height = '290px';
  } else {
    navList.style.height = '0';
  }
});
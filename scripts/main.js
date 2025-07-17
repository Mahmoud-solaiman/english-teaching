const hamburgerMenu = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-links');
const hamburgerMenuLines = document.querySelectorAll('.hamburger-menu div');


hamburgerMenu.addEventListener('pointerup', e => {
  if (getComputedStyle(navList).getPropertyValue('height') === '0px') {
    navList.style.height = '370px';

    hamburgerMenuLines[0].style = 'rotate: 60deg; translate: 0 10px;';
    hamburgerMenuLines[1].style = 'display: none;';
    hamburgerMenuLines[2].style = 'rotate: -60deg; translate: 0 -12px;';
  } else {
    navList.style.height = '0';
    
    hamburgerMenuLines[0].style = 'rotate: 0deg; translate: 0;';
    hamburgerMenuLines[1].style = 'display: block;';
    hamburgerMenuLines[2].style = 'rotate: 0deg; translate: 0;';
  }
});
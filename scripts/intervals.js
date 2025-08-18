//Intervals
export function handleIntervals(dueCards, cardNumber) {
  const interval = dueCards[cardNumber].interval;
  if(interval === 0 || interval === 5 || interval === 10 ){ //from zero to 10 minutes
    updateIntervals('1m', '5m', '10m', '15m');
  }
  if(interval === 15){ //15 minutes
    updateIntervals('10m', '15m', '1d', '3d');
  }
  if(interval === 1440){ // one day
    updateIntervals('10m', '2d', '3d', '5d');
  }
  if(interval === 2880 || interval === 4320){ // 2 days and 3 days
    updateIntervals('10m', '5d', '7d', '10d');
  }
  if(interval === 7200 || interval === 10080){ // 5 days and 7 days
    updateIntervals('10m', '8d', '12d', '15d');
  }
  if(interval === 11520 || interval === 14400){ // 8 days and 10 days
    updateIntervals('10m', '12d', '15d', '20d');
  }
  if(interval === 17280 || interval === 21600){ // 12 days and 15 days
    updateIntervals('10m', '18d', '23d', '1M');
  }
  if(interval === 25920 || interval === 28800){ // 18 days and 20 days
    updateIntervals('10m', '23d', '1M', '1.25M');
  }
  if(interval === 33120){ // 23 days
    updateIntervals('10m', '1M', '1.5M', '2M');
  }
  if(interval === 43200){ // 1 Month
    updateIntervals('10m', '1.5M', '2M', '3M');
  }
  if(interval === 43200 || interval === 54000){ // 1 Month and 1.25 Months
    updateIntervals('10m', '1.5M', '2M', '3M');
  }
  if(interval === 64800 || interval === 54000){ // 1.5 Month and 1.25 Months
    updateIntervals('10m', '2M', '3M', '4.5M');
  }
  if(interval === 86400){ // 2 Months
    updateIntervals('10m', '3M', '4.5M', '6M');
  }
  if(interval === 129600){ // 3 Months
    updateIntervals('10m', '4.5M', '6M', '8M');
  }
  if(interval === 194400 || interval === 259200 || interval === 345600 || interval === 432000 || interval === 518400){ // 4.5 Months, 6 Months, 8 Months, 10 Months, and 1 year
    updateIntervals('10m', '8M', '10M', '1Y');
  }
}

//Update intervals
export function updateIntervals(again, difficult, good, easy) {
  const againInterval = document.querySelector('.again-interval-time');
  const difficultInterval = document.querySelector('.difficult-interval-time');
  const goodInterval = document.querySelector('.good-interval-time');
  const easyInterval = document.querySelector('.easy-interval-time');

  againInterval.innerText = again;
  difficultInterval.innerText = difficult;
  goodInterval.innerText = good;
  easyInterval.innerText = easy;
}

//The difficult intervals checks
export function difficultIntervalsChecks(difficultInterval, dueCards, cardNumber, cardsInReview) {
  if(difficultInterval.innerText === '5m') {
    dueCards[cardNumber].interval = 5;
    dueCards[cardNumber].timesOfReview++;
    if(dueCards[cardNumber].timesOfReview >= 4) {
      dueCards[cardNumber].timesOfReview = 0;
    }

  } else if(difficultInterval.innerText === '15m') {
    dueCards[cardNumber].interval = 15;
    dueCards[cardNumber].timesOfReview += 2;
    if(dueCards[cardNumber].timesOfReview >= 4) {
      dueCards[cardNumber].timesOfReview = 0;
    }

  } else if(difficultInterval.innerText === '2d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 2880);  

  } else if(difficultInterval.innerText === '5d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 7200); 

  } else if(difficultInterval.innerText === '8d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 11520); 

  } else if(difficultInterval.innerText === '12d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 17280);


  } else if(difficultInterval.innerText === '18d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 25920);


  } else if(difficultInterval.innerText === '23d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 33120);


  } else if(difficultInterval.innerText === '1M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 43200);

  } else if(difficultInterval.innerText === '1.5M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 64800);

  } else if(difficultInterval.innerText === '2M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 86400);

  } else if(difficultInterval.innerText === '3M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 129600);

  } else if(difficultInterval.innerText === '8M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 345600);

  }
}

//The good intervals checks
export function goodIntervalsChecks(goodInterval, dueCards, cardNumber, cardsInReview) {
  if(goodInterval.innerText === '10m') {
    dueCards[cardNumber].interval = 10;
    if(dueCards[cardNumber].timesOfReview >= 4) {
      dueCards[cardNumber].interval = 15;
    }
    dueCards[cardNumber].timesOfReview += 2;  

  } else if(goodInterval.innerText === '1d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 1440);  

  } else if(goodInterval.innerText === '3d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 4320);  

  } else if(goodInterval.innerText === '7d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 10080); 

  } else if(goodInterval.innerText === '12d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 17280); 

  } else if(goodInterval.innerText === '15d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 21600);


  } else if(goodInterval.innerText === '23d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 33120);


  } else if(goodInterval.innerText === '1M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 43200);


  } else if(goodInterval.innerText === '1.5M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 64800);

  } else if(goodInterval.innerText === '2M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 86400);

  } else if(goodInterval.innerText === '3M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 129600);

  } else if(goodInterval.innerText === '4.5M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 194400);

  } else if(goodInterval.innerText === '10M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 432000);

  }
}

//The easy intervals checks
export function easyIntervalsChecks(easyIntervals, dueCards, cardNumber, cardsInReview) {
  if(easyIntervals.innerText === '15m') {
    dueCards[cardNumber].interval = 15;

  } else if(easyIntervals.innerText === '3d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 4320);  

  } else if(easyIntervals.innerText === '5d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 7200);  

  } else if(easyIntervals.innerText === '10d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 14400); 

  } else if(easyIntervals.innerText === '15d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 21600); 

  } else if(easyIntervals.innerText === '20d') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 28800);


  } else if(easyIntervals.innerText === '1M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 43200);


  } else if(easyIntervals.innerText === '1.25M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 54000);


  } else if(easyIntervals.innerText === '2M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 86400);

  } else if(easyIntervals.innerText === '3M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 129600);

  } else if(easyIntervals.innerText === '4.5M') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 194400);

  } else if(easyIntervals.innerText === '1Y') {
    updateLocalStorage(dueCards, cardNumber, cardsInReview, 518400);

  }
}

//Update local Storage info
function updateLocalStorage(dueCards, cardNumber, cardsInReview, intervalValue) {
  dueCards[cardNumber].interval = intervalValue;
  cardsInReview.push(dueCards[cardNumber]);
  dueCards[cardNumber].addTime = new Date().getTime();
  dueCards.splice(dueCards.indexOf(dueCards[cardNumber]), 1);
  localStorage.setItem('cardsInReview', JSON.stringify(cardsInReview));
}
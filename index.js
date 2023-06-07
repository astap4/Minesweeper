const BOMB = -1;
const EMPTY = 0;
const SIZES = [10, 15, 25];
let bombsNum = 10;
let results = [];
const COLORS = {
  '0': 'transparent',
  '1': 'blue',
  '2': 'green',
  '3': 'orange',
  '4': 'red',
  '5': 'brown',
  '6': 'blueviolet',
}

const bodyContainer = document.createElement('div');
bodyContainer.classList.add('container');
const modalContainer = document.createElement('div');
modalContainer.classList.add('modal');
document.body.append(modalContainer, bodyContainer,);
const modalWindow = document.createElement('div');
modalWindow.classList.add('modal-window');
modalContainer.append(modalWindow);
const title = document.createElement('h1');
title.classList.add('title');
title.textContent = 'Minesweeper';
const btnOpenResults = document.createElement('button');
btnOpenResults.classList.add('btn');
btnOpenResults.textContent = 'Results';
const btnStart = document.createElement('button');
btnStart.classList.add('btn');
btnStart.textContent = 'New game';
const btnStartModal = document.createElement('button');
btnStartModal.classList.add('btn');
btnStartModal.textContent = 'New game';
const menu = document.createElement('div');
menu.classList.add('menu');
const playField = document.createElement('div');
playField.classList.add('play-field');
const toggleTheme = document.createElement('div');
toggleTheme.classList.add('toggler');
const checkInput = document.createElement('input');
checkInput.type = 'checkbox';
checkInput.id = 'toggleCheckbox';
const checkLabel = document.createElement('label');
checkLabel.setAttribute('for', 'toggleCheckbox');
checkLabel.classList.add('toggle-label');
const onLabel = document.createElement('span');
onLabel.textContent = 'Dark';
const offLabel = document.createElement('span');
offLabel.textContent = 'Light';
toggleTheme.append(onLabel, checkInput, checkLabel, offLabel)
bodyContainer.append(title, btnStart, btnOpenResults, menu, playField, toggleTheme);
const menuContainer = document.createElement('div');
menuContainer.classList.add('menu-container');
const time = document.createElement('div');
time.textContent = 'Time: ';
const timeValue = document.createElement('div');
timeValue.textContent = '00:00';
timeValue.classList.add('time');
const movesCont = document.createElement('div');
movesCont.textContent = 'Moves: ';
const moves = document.createElement('div');
moves.textContent = 0;
moves.classList.add('moves')
const soundBtn = document.createElement('button');
soundBtn.classList.add('sound');
const flag = document.createElement('div');
flag.classList.add('flag')
const flagCounter = document.createElement('div');
const customDropdown = document.createElement('span');
customDropdown.classList.add('custom-dropdown');
customDropdown.textContent = 'Size ';
const minesAmount = document.createElement('div');
minesAmount.classList.add('mines-container')
const selectSize = document.createElement('select');
customDropdown.append(selectSize);
const minesInput = document.createElement('input');
const minesValue = document.createElement('span');
createMinesOptions();

minesInput.addEventListener('input', function () {
  minesValue.textContent = minesInput.value;
  bombsNum = parseInt(minesInput.value)
});

minesAmount.append(minesInput, minesValue)
createSizeOptions();
menuContainer.append(time, timeValue, flag, flagCounter, movesCont, moves, soundBtn);

menu.append(menuContainer);

checkInput.addEventListener('change', () => changeTheme(checkInput.checked));

function changeTheme(isChecked) {
  const container = document.body;
  const items = document.querySelectorAll('.item')
  if (isChecked) {
    items.forEach((item) => item.classList.add('dark'))
    container.classList.add('dark');
  } else {
    container.classList.remove('dark');
    items.forEach((item) => item.classList.remove('dark'))
  }
}

function createSizeOptions() {
  SIZES.forEach(num => {
    const optionSize = document.createElement('option');
    optionSize.textContent = `${num} x ${num}`;
    optionSize.value = `${num}`;
    if (num === 10) {
      optionSize.selected = true;
    }
    selectSize.append(optionSize);
  });
}

function createMinesOptions() {
  minesAmount.textContent = 'Mines ';
  minesInput.type = 'range';
  minesInput.min = 10;
  minesInput.max = 99;
  minesInput.step = 1;
  minesInput.value = 10;
  minesValue.textContent = minesInput.value;
}

document.addEventListener('DOMContentLoaded', () => {
  btnStart.addEventListener('click', () => {
    modalContainer.classList.add('visible');
    modalWindow.innerHTML = '';
    modalWindow.append(customDropdown, minesAmount, btnStartModal)
  })
  btnStartModal.addEventListener('click', () => {
    modalContainer.classList.remove('visible');
    createField(selectSize.value, bombsNum)
  })
  btnOpenResults.addEventListener('click', () => {
    modalContainer.classList.add('visible');
    modalWindow.innerHTML = '';
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results');
    const btnClose = document.createElement('button');
    btnClose.classList.add('btn', 'close');
    btnClose.textContent = 'Return';
    modalWindow.append(resultsContainer, btnClose)
    results.forEach((item, index) => {
      const result = document.createElement('div')
      result.textContent = `${index + 1}) Time: ${item.time } Moves: ${item.moves} `;
      resultsContainer.append(result)
    })
    btnClose.addEventListener('click', () => {
      modalContainer.classList.remove('visible');
    })
  })
});

// -------------------------TIME--------------------------
let timer;
const startTimer = () => {
  clearInterval(timer)
  let seconds = 0;
  let minutes = 0;
  const updateTime = () => {
    seconds++;
    if (seconds > 59) {
      minutes++;
      seconds = 0;
    }
    timeValue.innerHTML =
      ('0' + minutes).slice(-2) + ':' +
      ('0' + seconds).slice(-2);
  };
  timer = setInterval(updateTime, 1000);
}


function createField(size, bombsNum) {
  startTimer();
  bodyContainer.append(btnStart);
  modalContainer.classList.remove('visible');
  let counter = 0;
  moves.textContent = counter;
  flagCounter.textContent = bombsNum;
  const playField = document.querySelector('.play-field');
  playField.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  playField.style.gridTemplateRows = `repeat(${size}, 20px)`;
  playField.style.maxWidth = size * 20 + 'px';
  const length = size * size;
  startTimer();
  playField.innerHTML = '';
  let matrix = createEmptyMatrix(size);
  placeBombs(matrix, size, bombsNum);
  for (let i = 0; i < length; i++) {
    const item = document.createElement('div');
    item.classList.add('item');
    playField.append(item)
  }
  changeTheme(checkInput.checked);
  const items = [...playField.children];
  playField.addEventListener('click', (e) => {
    if (e.target.classList.contains('open')) {
      return;
    }
    const index = items.indexOf(e.target);
    const x = Math.floor(index / size);
    const y = index % size;
    counter++;
    moves.textContent = counter;
    openCell(x, y, size, matrix, items);
  })
  playField.oncontextmenu = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('open')) {
      if (e.target.classList.contains('flag')) {
        e.target.classList.remove('flag');
        flagCounter.textContent = Number(flagCounter.textContent) + 1;
      } else {
        e.target.classList.add('flag');
        flagCounter.textContent = Number(flagCounter.textContent) - 1;
      }
      if (!isMuted) {
        audioClick.play();
      }
      checkRemainingCells(items);
    }
  };
}
createField(10, 10)

function openCell(x, y, size, matrix, items) {
  const index = x * size + y;
  const currItem = items[index];
  if (!currItem || currItem.classList.contains('open')) {
    return;
  }
  currItem.classList.add('open');
  const value = matrix[x][y];
  currItem.style.color = COLORS[value];
  if (value === BOMB) {
    currItem.classList.add('bomb');
    if (!isMuted) {
      audioExplosion.play();
    }
    modalContainer.classList.add('visible');
    modalWindow.textContent = 'GAME OVER. TRY AGAIN';
    modalWindow.append(btnStart)
    clearInterval(timer);
  } else if (value === EMPTY) {
    currItem.textContent = value;
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        neighbors.push([x + i, y + j]);
      }
    }
    for (let i = 0; i < neighbors.length; i++) {
      const [neighborX, neighborY] = neighbors[i];
      if (isValid(size, neighborX, neighborY)) {
        openCell(neighborX, neighborY, size, matrix, items);
      }
    }
  } else {
    currItem.textContent = value;
    if (!isMuted) {
      audioClick.play();
    }
  }
  checkRemainingCells(items);
}

function checkRemainingCells(items) {
  const remainingCells = items.filter(item =>
    !item.classList.contains('open') &&
    !item.classList.contains('bomb') &&
    !item.classList.contains('flag')
  );
  if (remainingCells.length === 0) {
    modalContainer.classList.add('visible');
    const time = document.querySelector('.time').textContent;
    const counter = document.querySelector('.moves').textContent;
    modalWindow.textContent = `Hooray! You found all mines in ${time} and ${counter} moves!`;
    modalWindow.append(btnStart)
    clearInterval(timer);
    localStorage.setItem('time', time)
    localStorage.setItem('moves', counter);
    if (results.length >= 10) {
      results.shift();
    }
    results.push({ 'time': localStorage.getItem('time'), 'moves': localStorage.getItem('moves') })
  }
}

function createEmptyMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}

function placeBombs(matrix, size, bombsNum) {
  for (let i = 0; i < bombsNum; i++) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    if (matrix[x][y] !== BOMB) {
      matrix[x][y] = BOMB;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          addNum(matrix, size, x + j, y + i);
        }
      }
    } else {
      i--;
      continue;
    }
  }
}

function addNum(matrix, size, x, y) {
  if (isValid(size, x, y)) {
    if (matrix[x][y] === BOMB) {
      return
    };
    matrix[x][y] += 1
  }
}

function isValid(size, x, y) {
  if (x >= 0 && y >= 0 && x < size && y < size) {
    return true
  };
  return false;
}


// -------------------------SOUND--------------------------
soundBtn.addEventListener('click', toggleVolume)
const audioClick = new Audio();
audioClick.src = 'assets/sound/click.mp3';
const audioExplosion = new Audio();
audioExplosion.src = 'assets/sound/explosion.mp3';
let isMuted = false;

function toggleVolume() {
  isMuted = !isMuted;
  soundBtn.classList.toggle('off');
}





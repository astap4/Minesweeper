
const SIZES = [10, 15, 25];
let results = [];

// const toggleTheme = document.createElement('div');
// toggleTheme.classList.add('toggler');
// const checkInput = document.createElement('input');
// checkInput.type = 'checkbox';
// checkInput.id = 'toggleCheckbox';
// const checkLabel = document.createElement('label');
// checkLabel.setAttribute('for', 'toggleCheckbox');
// checkLabel.classList.add('toggle-label');
// const onLabel = document.createElement('span');
// onLabel.textContent = 'Dark';
// const offLabel = document.createElement('span');
// offLabel.textContent = 'Light';
// toggleTheme.append(onLabel, checkInput, checkLabel, offLabel)

// const soundBtn = document.createElement('button');
// soundBtn.classList.add('sound');
// const customDropdown = document.createElement('span');
// customDropdown.classList.add('custom-dropdown');
// customDropdown.textContent = 'Size ';
// const minesAmount = document.createElement('div');
// minesAmount.classList.add('mines-container')
// const selectSize = document.createElement('select');
// customDropdown.append(selectSize);
// const minesInput = document.createElement('input');
// const minesValue = document.createElement('span');
// createMinesOptions();

minesInput.addEventListener('input', function () {
  minesValue.textContent = minesInput.value;
  bombsNum = parseInt(minesInput.value)
});

minesAmount.append(minesInput, minesValue)
// createSizeOptions();
// menuContainer.append(time, timeValue, flag, flagCounter, movesCont, moves, soundBtn);


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

// function createSizeOptions() {
//   SIZES.forEach(num => {
//     const optionSize = document.createElement('option');
//     optionSize.textContent = `${num} x ${num}`;
//     optionSize.value = `${num}`;
//     if (num === 10) {
//       optionSize.selected = true;
//     }
//     selectSize.append(optionSize);
//   });
// }

// function createMinesOptions() {
//   minesAmount.textContent = 'Mines ';
//   minesInput.type = 'range';
//   minesInput.min = 10;
//   minesInput.max = 99;
//   minesInput.step = 1;
//   minesInput.value = 10;
//   minesValue.textContent = minesInput.value;
// }

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





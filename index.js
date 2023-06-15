
let results = [];

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





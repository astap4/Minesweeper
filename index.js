
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
    result.textContent = `${index + 1}) Time: ${item.time} Moves: ${item.moves} `;
    resultsContainer.append(result)
  })
  btnClose.addEventListener('click', () => {
    modalContainer.classList.remove('visible');
  })
})







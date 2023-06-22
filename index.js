
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






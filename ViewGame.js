import Header from './components/header/Header.js';
import Main from './components/main/Main.js';

export default class ViewGame {
    constructor() {
        this.model = null;
        this.field = null;
        this.COLORS = {
            '0': 'transparent',
            '1': 'blue',
            '2': 'green',
            '3': 'orange',
            '4': 'red',
            '5': 'brown',
            '6': 'blueviolet',
        }
    }

    start(model) {
        this.model = model;
    }

    build() {
        const bodyContainer = document.createElement('div');
        bodyContainer.classList.add('container');
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal');
        document.body.append(modalContainer, bodyContainer,);

        const modalWindow = document.createElement('div');
        modalWindow.classList.add('modal-window');
        modalContainer.append(modalWindow);

        const header = new Header();
        const main = new Main(this.model);
        bodyContainer.append(header.getElement(), main.getElement())


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
        // const customDropdown = document.createElement('span');
        // customDropdown.classList.add('custom-dropdown');
        // customDropdown.textContent = 'Size ';
        // const minesAmount = document.createElement('div');
        // minesAmount.classList.add('mines-container')
        // const selectSize = document.createElement('select');
        // customDropdown.append(selectSize);
        // const minesInput = document.createElement('input');
        // const minesValue = document.createElement('span');
        // this.createMinesOptions();
        // this.createSizeOptions();

    }

    createMinesOptions() {
        minesAmount.textContent = 'Mines ';
        minesInput.type = 'range';
        minesInput.min = 10;
        minesInput.max = 99;
        minesInput.step = 1;
        minesInput.value = 10;
        minesValue.textContent = minesInput.value;
    }

    createSizeOptions() {
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

    updateTime(minutes, seconds) {
        const timeValue = document.querySelector('.time')
        timeValue.innerHTML =
            ('0' + minutes).slice(-2) + ':' +
            ('0' + seconds).slice(-2);
    }

    updateMoves(count) {
        const moves = document.querySelector('.moves')
        moves.textContent = count;
    }

    updateColor(element, value) {
        element.classList.add('open');
        element.style.color = this.COLORS[value];
    }

    showBomb(element) {
        element.classList.add('bomb');
    }

    updateFlags(bombsNum) {
        const flagCounter = document.querySelector('.flag-counter')
        flagCounter.textContent = bombsNum;
    }

}
export default class Settings {
    constructor(model) {
        this.settings = null;
        this.model = model;
    }

    create() {
        this.settings = document.createElement('div');
        this.settings.classList.add('settings-container');
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
        const customDropdown = document.createElement('span');
        customDropdown.classList.add('custom-dropdown');
        customDropdown.textContent = 'Size ';
        const selectSize = document.createElement('select');
        selectSize.classList.add('select-size')
        customDropdown.append(selectSize);
        const buttons = document.createElement('div');
        buttons.classList.add('buttons-sound');
        const soundBtn = document.createElement('button');
        soundBtn.classList.add('sound');
        const musicBtn = document.createElement('button');
        musicBtn.classList.add('music', 'off');
        buttons.append(musicBtn, soundBtn)
        const minesAmount = document.createElement('div');
        this.createMinesOptions(minesAmount);
        this.createSizeOptions(selectSize);
        const startBtn = document.createElement('button');
        startBtn.classList.add('btn', 'btn-start');
        startBtn.textContent = 'New Game';
        this.settings.append(customDropdown,minesAmount, toggleTheme, buttons, startBtn);
    }

    createMinesOptions(elem) {      
        elem.classList.add('mines-container')
        const minesInput = document.createElement('input');
        minesInput.classList.add('mines-input')
        const minesValue = document.createElement('span');
        minesValue.classList.add('mines-value')
        elem.textContent = 'Mines ';
        minesInput.type = 'range';
        minesInput.min = 10;
        minesInput.max = 99;
        minesInput.step = 1;
        minesInput.value = 10;
        minesValue.textContent = minesInput.value;
        elem.append(minesInput, minesValue)
    }

    createSizeOptions(elem) {
        this.model.sizes.forEach(num => {
            const optionSize = document.createElement('option');
            optionSize.textContent = `${num} x ${num}`;
            optionSize.value = `${num}`;
            if (num === this.model._size) {
                optionSize.selected = true;
            }
            elem.append(optionSize);
        });
    }

    getElement() {
        this.create();
        return this.settings;
    }
}
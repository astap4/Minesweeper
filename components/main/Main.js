export default class Main {
    constructor(model) {
        this.main = null;
        this.model = model;
        this.moves = null;
        this.playField = null;
        this.timeValue = null;
    }

    create() {
        this.main = document.createElement('main');
        this.main.classList.add('main');
        const controls = document.createElement('div');
        controls.classList.add('controls');
        const time = document.createElement('div');
        time.textContent = 'Time: ';
        this.timeValue = document.createElement('div');
        this.timeValue.textContent = '00:00';
        this.timeValue.classList.add('time');
        const movesCont = document.createElement('div');
        movesCont.textContent = 'Moves: ';
        this.moves = document.createElement('div');
        this.moves.classList.add('moves')
        // const soundBtn = document.createElement('button');
        // soundBtn.classList.add('sound');
        const flag = document.createElement('div');
        flag.classList.add('flag')
        const flagCounter = document.createElement('div');
        flagCounter.classList.add('flag-counter')
        flagCounter.textContent = this.model.bombsNum;
        controls.append(time, this.timeValue, flag, flagCounter, movesCont, this.moves);
        this.playField = document.createElement('div');
        this.playField.classList.add('play-field');
        this.main.append(controls, this.playField);
        this.createField(10);
    }

    getElement() {
        this.create();
        return this.main;
    }

    createField(size) {
        this.model.startTimer();
        // modalContainer.classList.remove('visible');
        this.moves.textContent = this.model.moves;
        this.playField.style.width = `${(size * 30)}px`
        this.playField.style.height = `${(size * 30)}px`
        this.playField.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        this.playField.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        const length = size * size;
        this.playField.innerHTML = '';
        this.model.getEmptyMatrix();
        this.model.placeBombs();
        for (let i = 0; i < length; i++) {
            const item = document.createElement('div');
            item.classList.add('item');
            this.playField.append(item)
        }
        // changeTheme(checkInput.checked);
    }

    updateTime() {

    }
}
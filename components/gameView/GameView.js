export default class GameView {
    constructor(model) {
        this.gameContainer = null;
        this.model = model;
        this.moves = null;
        this.playField = null;
        this.timeValue = null;
    }

    create() {
        this.gameContainer = document.createElement('div');
        this.gameContainer.classList.add('game-container');
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
        const flag = document.createElement('div');
        flag.classList.add('flag')
        const flagCounter = document.createElement('div');
        flagCounter.classList.add('flag-counter')
        flagCounter.textContent = this.model._bombsNum;
        controls.append(time, this.timeValue, flag, flagCounter, movesCont, this.moves);
        this.playField = document.createElement('div');
        this.playField.classList.add('play-field');
        const btnRestart = document.createElement('button');
        btnRestart.classList.add('btn', 'btn-restart');
        btnRestart.textContent = 'Restart';
        this.gameContainer.append(controls, this.playField, btnRestart);
        this.createField(this.model._size);
    }

    getElement() {
        this.create();
        return this.gameContainer;
    }

    createField(size) {
        console.log(this.model)
        this.playField.innerHTML='';
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
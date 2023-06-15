
export default class Game {
    constructor() {
        this.view = null;
        this.sizes = [10, 15, 20];
        this._size = 15;
        this._bombsNum = 10;
        this.timer = null;
        this.moves = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.matrix = [];
        this.isMuted = false;
        this.SPAState = {};
    }

    start(view) {
        this.view = view;
    }

    updateView() {
        if (this.view)
            this.view.build();
    }

    set bombsNum(value) {
        this._bombsNum = value;
        this.view.updateFlags()
    }

    set size(value) {
        this._size = value;
    }

    restart() {
        this.stopTimer()
        this.view.build();
        this.moves = 0;
        this.view.updateTime(this.minutes, this.seconds);
        this.view.updateFlags(this._bombsNum);;
        this.view.updateMoves(this.moves);
    }

    getEmptyMatrix() {
        this.matrix = [];
        for (let i = 0; i < this._size; i++) {
            let row = [];
            for (let j = 0; j < this._size; j++) {
                row.push(0);
            }
            this.matrix.push(row);
        }
    }

    placeBombs() {
        const BOMB = -1;
        for (let i = 0; i < this._bombsNum; i++) {
            let x = Math.floor(Math.random() * this._size);
            let y = Math.floor(Math.random() * this._size);
            if (this.matrix[x][y] !== BOMB) {
                this.matrix[x][y] = BOMB;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        this.addNum(x + j, y + i);
                    }
                }
            } else {
                i--;
                continue;
            }
        }
        console.log(this.matrix)
    }

    addNum(x, y) {
        const BOMB = -1;
        if (this.isValid(x, y)) {
            if (this.matrix[x][y] === BOMB) {
                return
            };
            this.matrix[x][y] += 1
        }
    }

    isValid(x, y) {
        if (x >= 0 && y >= 0 && x < this._size && y < this._size) {
            return true
        };
        return false;
    }

    getTime() {
        this.seconds++;
        if (this.seconds > 59) {
            this.minutes++;
            this.seconds = 0;
        }
        this.view.updateTime(this.minutes, this.seconds)
    }

    startTimer() {
        this.seconds = 0;
        this.minutes = 0;
        this.timer = setInterval(() => {
            this.getTime();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    initCell(cellNum, items) {
        const x = Math.floor(cellNum / this._size);
        const y = cellNum % this._size;
        this.moves++;
        if (!this.isMuted) {
            this.playAudio('click');
        }
        this.openCell(x, y, items);
    }

    openCell(x, y, items) {
        const BOMB = -1;
        const EMPTY = 0;
        this.view.updateMoves(this.moves);
        const index = x * this._size + y;
        const currItem = items[index];
        if (!currItem || currItem.classList.contains('open')) {
            return;
        }
        const value = this.matrix[x][y];
        this.view.updateColor(currItem, value);

        if (value === BOMB) {
            this.view.showBomb(currItem);
            if (!this.isMuted) {
                this.playAudio('bomb');
            }
            this.stopTimer();
            this.view.showModalWindow();
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
                if (this.isValid(neighborX, neighborY)) {
                    this.openCell(neighborX, neighborY, items);
                }
            }
        } else {
            currItem.textContent = value;
        }
        // checkRemainingCells(items);
    }

    openFlag(elem) {
        const flagCounter = document.querySelector('.flag-counter')
        const flagNum = Number(flagCounter.textContent)
        if (!elem.classList.contains('open')) {
            if (elem.classList.contains('flag')) {
                elem.classList.remove('flag');
                this.view.updateFlags(flagNum + 1);
            } else {
                elem.classList.add('flag');
                this.view.updateFlags(flagNum - 1);
            }
            if (!this.isMuted) {
                this.playAudio('click');
            }
            // checkRemainingCells(items);
        }
    }

    playAudio(type) {
        const sound = new Audio();
        switch (type) {
            case 'click':
                sound.src = 'assets/sound/click.mp3';
                break;
            case 'bomb':
                sound.src = 'assets/sound/explosion.mp3';
                break;
            default:
                alert("Это не выполнится");
        }
        sound.play();
    }


    toggleVolume() {
        const soundBtn = document.querySelector('.sound');
        this.isMuted = !this.isMuted;
        soundBtn.classList.toggle('off');
    }

    switchToStateFromURLHash() {
        console.log('hello')
        const URLHash = window.location.hash;
        console.log(URLHash)
        // убираем из закладки УРЛа решётку
        // (по-хорошему надо ещё убирать восклицательный знак, если есть)
        const stateStr = URLHash.substring(1);

        if (stateStr != "") { // если закладка непустая, читаем из неё состояние и отображаем
            const parts = stateStr.split("_")
            this.SPAState = { pagename: parts[0] }; // первая часть закладки - номер страницы
        }
        // else
        //     this.SPAState = { pagename: 'Game' }; // иначе показываем главную страницу

        console.log('Новое состояние приложения:');
        console.log(this.SPAState);
        // обновляем вариабельную часть страницы под текущее состояние
        // это реализация View из MVC - отображение состояния модели в HTML-код
        switch (this.SPAState.pagename) {
            case 'Game':
                this.view.showGamePage();
                break;
            case 'Records':
                this.view.showRecordsPage();
                break;
            case 'Rules':
                this.view.showRulesPage();
                break;
            case 'Settings':
                this.view.showSettingsPage();
                break;
        }
    }

    // устанавливает в закладке УРЛа новое состояние приложения
    // и затем устанавливает+отображает это состояние
    switchToState(newState) {
        var stateStr = newState.pagename;
        location.hash = stateStr;
    }
}


export default class Game {
    constructor() {
        this.view = null;
        this.size = 10;
        this.bombsNum = 10;
        this.timer = null;
        this.moves = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.matrix = [];
        this.isMuted = false;
    }

    start(view) {
        this.view = view;
    }

    updateView() {
        if (this.view)
            this.view.build();
    }

    getEmptyMatrix() {
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(0);
            }
            this.matrix.push(row);
        }
    }

    placeBombs() {
        const BOMB = -1;
        for (let i = 0; i < this.bombsNum; i++) {
            let x = Math.floor(Math.random() * this.size);
            let y = Math.floor(Math.random() * this.size);
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
        if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
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
        const x = Math.floor(cellNum / this.size);
        const y = cellNum % this.size;
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
        const index = x * this.size + y;
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
            //   modalContainer.classList.add('visible');
            //   modalWindow.textContent = 'GAME OVER. TRY AGAIN';
            //   modalWindow.append(btnStart)
            this.stopTimer();
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
        if (!elem.classList.contains('open')) {
            if (elem.classList.contains('flag')) {
                elem.classList.remove('flag');
                this.bombsNum++;
                this.view.updateFlags(this.bombsNum);
                // flagCounter.textContent = Number(flagCounter.textContent) + 1;
            } else {
                elem.classList.add('flag');
                this.bombsNum--;
                this.view.updateFlags(this.bombsNum);
                // flagCounter.textContent = Number(flagCounter.textContent) - 1;
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
    // soundBtn.addEventListener('click', toggleVolume)

    toggleVolume() {
        this.isMuted = !isMuted;
        soundBtn.classList.toggle('off');
    }
}


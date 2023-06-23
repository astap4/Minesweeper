
export default class GameModel {
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
        this.isMusic = false;
        this.music = new Audio();
        this.items = null;
        this.isChecked = false;
        this.results = { 10: [], 15: [], 20: [] };
        this.SPAState = {};
        this.ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = 'ASTAP_MINESWEEPER_RESULTS';
        this.updatePassword = 0;
    }

    start(view) {
        this.view = view;
    }

    updateView() {
        if (this.view)
            this.view.build();
        const playField = document.querySelector('.play-field');
        this.items = [...playField.children];
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
        const playField = document.querySelector('.play-field');
        this.items = [...playField.children];
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

    initCell(cellNum) {
        const x = Math.floor(cellNum / this._size);
        const y = cellNum % this._size;
        this.moves++;
        if (!this.isMuted) {
            this.playAudio('click');
        }
        this.openCell(x, y);
    }

    openCell(x, y) {
        const BOMB = -1;
        const EMPTY = 0;
        this.view.updateMoves(this.moves);
        const index = x * this._size + y;
        const currItem = this.items[index];
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
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }
            this.stopTimer();
            this.view.showModalWindow('Loss');
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
                    this.openCell(neighborX, neighborY);
                }
            }
        } else {
            currItem.textContent = value;
        }
        this.checkRemainingCells();
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
            this.checkRemainingCells();
        }
    }

    checkRemainingCells() {
        const remainingCells = this.items.filter(item =>
            !item.classList.contains('open') &&
            !item.classList.contains('bomb') &&
            !item.classList.contains('flag')
        );
        if (remainingCells.length === 0) {
            if (!this.isMuted) {
                this.playAudio('win');
            }
            this.view.showModalWindow('Win');
            this.stopTimer();
        }
    }

    checkCurrCell(x, y) {
        const playField = document.querySelector('.play-field');
        const playFieldRect = playField.getBoundingClientRect();
        const playFieldX = playFieldRect.left;
        const playFieldY = playFieldRect.top;
        const relativeX = x - playFieldX;
        const relativeY = y - playFieldY;
        const cellSize = playFieldRect.width / this._size;
        const columnIndex = Math.floor(relativeX / cellSize);
        const rowIndex = Math.floor(relativeY / cellSize);
        const cells = playField.querySelectorAll('.item');
        const numColumns = Math.sqrt(cells.length);
        const cellIndex = rowIndex * numColumns + columnIndex;
        const targetCell = cells[cellIndex];
        this.openFlag(targetCell)
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
            case 'win':
                sound.src = 'assets/sound/windows-3_1-tada.mp3';
                break;
            default:
                alert("Это не выполнится");
        }
        sound.play();
    }

    playMusic() {
        this.music.src = 'assets/sound/music2.mp3';
        this.music.currentTime = 0;
        this.music.play();
    }

    stopMusic() {
        this.music.pause();
        this.music.currentTime = 0;
    }

    toggleVolume() {
        const soundBtn = document.querySelector('.sound');
        this.isMuted = !this.isMuted;
        soundBtn.classList.toggle('off');
    }

    toggleMusic() {
        const musicBtn = document.querySelector('.music');
        this.isMusic = !this.isMusic;
        musicBtn.classList.toggle('off')
        if (this.isMusic) {
            this.playMusic()
        } else {
            this.stopMusic()
        }
    }

    changeTheme() {
            const checkInput = document.getElementById('toggleCheckbox');
            if(checkInput) {
                this.isChecked = checkInput.checked;
            }
            const container = document.body;
            const controls = document.querySelector('.controls')
            const items = document.querySelectorAll('.item')
            if (this.isChecked) {
              items.forEach((item) => item.classList.add('dark'))
              container.classList.add('dark');
              controls.classList.add('dark');
            } else {
              container.classList.remove('dark');
              controls.classList.remove('dark');
              items.forEach((item) => item.classList.remove('dark'))
            }
    }
//SPA
    switchToStateFromURLHash() {
        const URLHash = window.location.hash;
        // убираем из закладки УРЛа решётку
        const stateStr = URLHash.substring(1);

        if (stateStr != "") { // если закладка непустая, читаем из неё состояние и отображаем
            const parts = stateStr.split("_")
            this.SPAState = { pagename: parts[0] }; // первая часть закладки - номер страницы
        }
        // else
        //     this.SPAState = { pagename: 'Game' }; // иначе показываем главную страницу

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

    //AJAX
    storeInfo() {
        let recordName = document.getElementById('IName').value;
        if (recordName.trim() === '') {
            recordName = 'Unknown';
        }
        this.updatePassword = Math.random();
        const newResult = {
            name: recordName,
            moves: this.moves,
            minutes: this.minutes,
            seconds: this.seconds
        };

        this.results[this._size].push(newResult);
        console.log(this.results[this._size])
        this.results[this._size].sort(this.sortByTime);
        // Проверка и удаление лишних результатов, если нужно
        if (this.results[this._size].length > 10) {
            this.results[this._size].shift();
        }

        $.ajax({
            url: this.ajaxHandlerScript,
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                f: 'LOCKGET',
                n: this.stringName,
                p: this.updatePassword
            },
            success: this.lockGetReady.bind(this),
            error: this.errorHandler
        });
    }

    lockGetReady(callresult) {
        if (callresult.error !== undefined) {
            console.log(callresult.error);
        } else {
            console.log(this.results)
            $.ajax({
                url: this.ajaxHandlerScript,
                type: 'POST',
                cache: false,
                dataType: 'json',
                data: {
                    f: 'UPDATE',
                    n: this.stringName,
                    v: JSON.stringify(this.results),
                    p: this.updatePassword
                },
                success: this.updateReady.bind(this),
                error: this.errorHandler
            });
        }
    }

    updateReady(callresult) {
        if (callresult.error !== undefined) {
            alert(callresult.error);
        }
    }

    restoreInfo() {
        $.ajax({
            url: this.ajaxHandlerScript,
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                f: 'READ',
                n: this.stringName
            },
            success: this.readReady.bind(this),
            error: this.errorHandler
        });
    }

    readReady(callresult) {
        if (callresult.error !== undefined) {
            alert(callresult.error);
        } else if (callresult.result !== "") {
            const info = JSON.parse(callresult.result);
            this.results = info;
        }
    }

    errorHandler(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
    }

    sortByTime(a, b) {
        if (a.minutes !== b.minutes) {
            return a.minutes - b.minutes;
        }
        // Если минуты равны, сравнение по секундам
        return a.seconds - b.seconds;
    }
}


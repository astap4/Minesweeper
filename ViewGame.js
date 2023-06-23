import PlayFieldView from './components/playFieldView/PlayFieldView.js';
import Settings from './components/settingsView/Settings.js';
import HeaderView from './components/headerView/HeaderView.js';
import RulesView from './components/rulesView/RulesView.js';
import RecordsView from './components/recordsView/RecordsView.js';
import ModalWindowView from './components/modalWindow/ModalWindow.js';
export default class ViewGame {
    constructor() {
        this.model = null;
        this.modalWindow = null;
        this.header = null;
        this.main = null;
        this.gameView = null;
        this.settings = null;
        this.rules = null;
        this.records = null;
        this.bodyContainer = null;
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
        if (this.bodyContainer) {
            this.updateField();
        } else {
            this.bodyContainer = document.createElement('div');
            this.bodyContainer.classList.add('container');
            this.modalWindow = new ModalWindowView(this.model);
            const modalElem = this.modalWindow.getElement();
            document.body.append(modalElem, this.bodyContainer);
            this.main = document.createElement('main');
            this.main.classList.add('main');
            this.header = new HeaderView();
            const headerElem = this.header.getElement();
            this.gameView = new PlayFieldView(this.model);
            const gameElem = this.gameView.getElement();
            this.main.append(gameElem)
            this.bodyContainer.append(headerElem, this.main)
        }

    }

    updateField() {
        this.gameView.createField(this.model._size)
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

    updateFlags(num) {
        const minesValue = document.querySelector('.mines-value');
        if (minesValue)
            minesValue.textContent = this.model._bombsNum;
        else {
            const flagCounter = document.querySelector('.flag-counter')
            flagCounter.textContent = num;
        }
    }

    showModalWindow(result) {
        const modalContainer = document.querySelector('.modal');
        modalContainer.classList.add('visible');
        switch (result) {
            case 'Win':
                this.modalWindow.showWin();
                break;
            case 'Loss':
                this.modalWindow.showLose();
                break;
        }
    }

    showGamePage() {
        const gameContainer = document.querySelector('.game-container');
        gameContainer.classList.remove('hidden')
        const lastElement = this.main.lastChild;
        if (lastElement != gameContainer) {
            this.main.removeChild(lastElement);
        }
    }

    showSettingsPage() {
        const gameContainer = document.querySelector('.game-container');
        gameContainer.classList.add('hidden');
        const lastElement = this.main.lastChild;
        if (lastElement != gameContainer) {
            this.main.removeChild(lastElement);
        }
        if (this.settings) {
            this.main.append(this.settings)
        } else {
            this.settings = new Settings(this.model).getElement()
            this.main.append(this.settings)
        }
    }

    showRulesPage() {
        const gameContainer = document.querySelector('.game-container');
        gameContainer.classList.add('hidden');
        const lastElement = this.main.lastChild;
        if (lastElement != gameContainer) {
            this.main.removeChild(lastElement);
        }
        if (this.rules) {
            this.main.append(this.rules)
        } else {
            this.rules = new RulesView(this.model).getElement()
            this.main.append(this.rules)
        }
    }

    showRecordsPage() {
        const gameContainer = document.querySelector('.game-container');
        gameContainer.classList.add('hidden');
        const lastElement = this.main.lastChild;
        if (lastElement != gameContainer) {
            this.main.removeChild(lastElement);
        }
        if (this.records) {
            const recordsElem = this.records.getElement();
            this.records.updateRecords()
            this.main.append(recordsElem)
        } else {
            this.records = new RecordsView(this.model);
            const recordsElem = this.records.getElement();
            this.main.append(recordsElem)
        }
    }
}
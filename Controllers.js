export default class Controllers {
    constructor() {
        this.model = null;
    }

    start(model) {
        this.model = model;
        this.minesInput = null;
        this.btnStart = null;
        this.soundBtn = null;
        this.selectSize = null;
    }

    addListeners() {
        const playField = document.querySelector('.play-field');
        const modalWindow = document.querySelector('.modal');
        const btnGame = document.querySelector('.btn-game');
        const btnRestart = document.querySelector('.btn-restart');
        const btnSettings = document.querySelector('.btn-settings');
        const btnRules = document.querySelector('.btn-rules');
        const btnRecords = document.querySelector('.btn-records');
        const btnSave = document.querySelector('.btn-save');
        playField.addEventListener('click', this.leftClickCellHandler.bind(this));
        playField.addEventListener('contextmenu', this.rightClickCellHandler.bind(this));
        modalWindow.addEventListener('click', this.closeModalWindow.bind(this));
        btnGame.addEventListener('click', this.openGame.bind(this));
        btnRestart.addEventListener('click', this.restartGame.bind(this));
        btnSettings.addEventListener('click', this.openSettings.bind(this));
        btnRules.addEventListener('click', this.openRules.bind(this));
        btnRecords.addEventListener('click', this.openRecords.bind(this));
        btnSave.addEventListener('click', this.saveResults.bind(this));
        console.log(btnSave)
    }

    addSettingsListeners() {
        if (!this.btnStart) {
            this.btnStart = document.querySelector('.btn-start');
            this.soundBtn = document.querySelector('.sound');
            this.minesInput = document.querySelector('.mines-input');
            this.selectSize = document.querySelector('.select-size');
            this.btnStart.addEventListener('click', this.startNewGame.bind(this));
            this.minesInput.addEventListener('input', this.changeBombsNum.bind(this));
            this.soundBtn.addEventListener('click', this.toggleVolume.bind(this))
            this.selectSize.addEventListener('change', this.changeSize.bind(this));
        }
    }

    restartGame() {
        this.model.restart();
    }

    startNewGame() {
        this.model.switchToState({ pagename: 'Game' });
        this.model.switchToStateFromURLHash();
        this.model.restart();
    }

    openGame() {
        this.model.switchToState({ pagename: 'Game' });
        this.model.switchToStateFromURLHash();
    }

    openSettings() {
        this.model.switchToState({ pagename: 'Settings' });
        this.model.switchToStateFromURLHash();
        this.addSettingsListeners()
    }

    openRules() {
        this.model.switchToState({ pagename: 'Rules' });
        this.model.switchToStateFromURLHash();
    }

    openRecords() {
        this.model.switchToState({ pagename: 'Records' });
        this.model.switchToStateFromURLHash();
    }

    closeModalWindow(e) {
        const modalWindow = document.querySelector('.modal')
        if (e.target.closest('.modal-window')) {
            return;
        }
        modalWindow.classList.remove('visible');
        this.model.restart();
    }

    closeModalAfterSave() {
        const modalWindow = document.querySelector('.modal')
        modalWindow.classList.remove('visible');
        this.model.restart();
    }

    leftClickCellHandler(e) {
        const playField = document.querySelector('.play-field');
        const items = [...playField.children];
        if (e.target.classList.contains('open')) {
            return;
        }
        const index = items.indexOf(e.target);
        this.model.initCell(index)
    }

    rightClickCellHandler(e) {
        e.preventDefault();
        const currElem = e.target;
        this.model.openFlag(currElem)
    }

    changeBombsNum() {
        this.model.bombsNum = parseInt(this.minesInput.value)
    }

    changeSize() {
        this.model.size = parseInt(this.selectSize.value)
    }

    toggleVolume() {
        this.model.toggleVolume();
    }

    saveResults() {
        this.model.storeInfo();
        this.closeModalAfterSave()
    }
}
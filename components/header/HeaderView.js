
export default class HeaderView {
    constructor() {
        this.header = null;
    }

    create() {
        this.header = document.createElement('header');
        this.header.classList.add('header');
        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = 'Minesweeper';
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const btnRecords = document.createElement('button');
        btnRecords.classList.add('btn', 'btn-records');
        btnRecords.textContent = 'Records';
        const btnGame = document.createElement('button');
        btnGame.classList.add('btn', 'btn-game');
        btnGame.textContent = 'Game';
        const btnRules = document.createElement('button');
        btnRules.classList.add('btn', 'btn-rules');
        btnRules.textContent = 'Rules';
        const btnSettings = document.createElement('button');
        btnSettings.classList.add('btn', 'btn-settings');
        btnSettings.textContent = 'Settings';
        buttons.append(btnGame, btnRecords, btnRules, btnSettings)
        this.header.append(title, buttons)
    }

    getElement() {
        this.create();
        return this.header;
    }
}
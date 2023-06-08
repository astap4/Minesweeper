
export default class Header {
    constructor() {
        this.header = null;
    }

    create() {
        this.header = document.createElement('header');
        this.header.classList.add('header');
        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = 'Сапёр';
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const btnRecords = document.createElement('button');
        btnRecords.classList.add('btn', 'btn-records');
        btnRecords.textContent = 'Records';
        const btnStart = document.createElement('button');
        btnStart.classList.add('btn', 'btn-start');
        btnStart.textContent = 'New game';
        const btnRules = document.createElement('button');
        btnRules.classList.add('btn', 'btn-rules');
        btnRules.textContent = 'Rules';
        const btnSettings = document.createElement('button');
        btnSettings.classList.add('btn', 'btn-settings');
        btnSettings.textContent = 'Settings';
        // const btnStartModal = document.createElement('button');
        // btnStartModal.classList.add('btn');
        // btnStartModal.textContent = 'New game';
        buttons.append(btnStart, btnRecords, btnRules, btnSettings)
        this.header.append(title, buttons)
    }

    getElement() {
        this.create();
        return this.header;
    }
}
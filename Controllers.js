export default class Controllers {
    constructor() {
        this.model = null;
        this.playField = null;
    }

    start(model) {
        this.model = model;
    }

    addListeners() {
        this.playField = document.querySelector('.play-field');
        this.playField.addEventListener('click', this.leftClickCellHandler.bind(this));
        this.playField.addEventListener('contextmenu', this.rightClickCellHandler.bind(this));
        const btnStart = document.querySelector('.btn-start')
        btnStart.addEventListener('click', this.openModalWindow());
    }

    openModalWindow() {
        if (this.model) {

        }
    }

    leftClickCellHandler(e) {
        const items = [...this.playField.children];
            if (e.target.classList.contains('open')) {
                return;
            }
            const index = items.indexOf(e.target);
            this.model.initCell(index, items)
    }

    rightClickCellHandler(e) {
        e.preventDefault();
        const currElem = e.target;
        this.model.openFlag(currElem)

    }

//     this.playField.oncontextmenu = (e) => {
//     e.preventDefault();

// };
}
export default class ModalWindowView {
    constructor(model) {
        this.modal = null;
        this.model = model;
        this.modalText = null;
        this.modalInput = null;
    }

    create() { 
        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        const modalWindow = document.createElement('div');
        modalWindow.classList.add('modal-window');
        this.modalText = document.createElement('p');
        this.modalInput = document.createElement('div');
        this.modalInput.classList.add('modal-input');       
        this.modalInput.innerHTML = `Name:<input type=text  id='IName'><input type=button class='btn btn-save' value='Save'>`
        modalWindow.append(this.modalText, this.modalInput)
        this.modal.append(modalWindow);
    }

    getElement() {
        this.create();
        return this.modal;
    }

    showWin() {
        document.getElementById('IName').value = '';
        this.modalInput.classList.remove('hidden');
        this.modalText.textContent = `Hooray! You found all mines in ${this.model.minutes}min ${this.model.seconds}sec and ${this.model.moves}moves!`;
    }

    showLose() {
        this.modalInput.classList.add('hidden');
        this.modalText.textContent = 'GAME OVER. TRY AGAIN';
    }
}
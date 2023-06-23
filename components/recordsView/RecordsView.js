
export default class RecordsView {
    constructor(model) {
        this.records = null;
        this.model = model;
        this.easy = null;
        this.medium = null;
        this.hard = null;
    }

    create() {
        this.records = document.createElement('div');
        const recordsContent = document.createElement('div');
        recordsContent.classList.add('records-container');
        this.records.append(recordsContent);
        this.easy = document.createElement('ul');
        this.easy.classList.add('records-level');
        this.medium = document.createElement('ul');   
        this.medium.classList.add('records-level');
        this.hard = document.createElement('ul'); 
        this.hard.classList.add('records-level');
        recordsContent.append(this.easy, this.medium, this.hard)
        this.updateRecords()
    }

    getElement() {
        this.create();
        return this.records;
    }

    updateRecords() {
        this.easy.innerHTML = '';
        this.medium.innerHTML = '';
        this.hard.innerHTML = '';
        this.easy.innerHTML += `<h3 class='level-title'>Easy</h3>`;
        this.medium.innerHTML += `<h3 class='level-title'>Medium</h3>`;
        this.hard.innerHTML += `<h3 class='level-title'>Hard</h3>`;
        this.model.results[10].forEach(element => {
            this.easy.innerHTML += `<li>${element.name}, Time: ${element.time}, Moves: ${element.moves}</li>`
        });
        this.model.results[15].forEach(element => {
            this.medium.innerHTML += `<li>${element.name}, Time: ${element.time}, Moves: ${element.moves}</li>`
        });
        this.model.results[20].forEach(element => {
            this.hard.innerHTML += `<li>${element.name}, Time: ${element.time}, Moves: ${element.moves}</li>`
        });
    }
}
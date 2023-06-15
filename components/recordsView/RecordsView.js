export default class RecordsView {
    constructor() {
        this.records = null;
    }

    create() {
        this.records = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = 'Records';
        const recordsContent = document.createElement('div');
        this.records.append(title, recordsContent)
    }

    getElement() {
        this.create();
        return this.records;
    }
}
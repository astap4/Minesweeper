export default class RecordsView {
    constructor(model) {
        this.records = null;
        this.model = model;
    }

    create() {
        this.records = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = 'Records';
        const recordsContent = document.createElement('div');
        this.records.append(title, recordsContent);
        // this.model.restoreInfo()
    }

    getElement() {
        this.create();
        return this.records;
    }
}
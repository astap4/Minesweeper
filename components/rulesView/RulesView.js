export default class RulesView {
    constructor() {
        this.rules = null;
    }

    create() {
        this.rules = document.createElement('div');
        this.rules.classList.add('rules-container')
        const title = document.createElement('h3');
        title.textContent = 'Rules';
        const rulesContent = document.createElement('div');
        rulesContent.innerHTML = '<p>Your mission, should you choose to accept it, is to open all the empty cells while avoiding cells with mines. </p>'
        rulesContent.innerHTML += '<p>During the game, the player uses information given from the opened cells to deduce further cells that are safe to open, iteratively gaining more information to solve the board.</p> <p>The player is also given the number of remaining mines in the board, known as the minecount, which is calculated as the total number of mines subtracted by the number of flagged cells (thus the minecount can be negative if too many flags have been placed).</p>'
        rulesContent.innerHTML += '<p>To win a game of Minesweeper, all non-mine cells must be opened without opening a mine.There is no score, however there is a timer recording the time taken to finish the game. </p> <p>Difficulty can be increased by adding mines or starting with a larger grid. There are three board configurations, usually known as beginner, intermediate and expert, in order of increasing difficulty. Beginner is usually on an 10x10 containing 10 mines, Intermediate is on a 15x15 board with 40 mines and expert is usually on a 20x20 board with 70 mines, however this is usually customisable.</p>'
        this.rules.append(title, rulesContent)
    }

    getElement() {
        this.create();
        return this.rules;
    }
}
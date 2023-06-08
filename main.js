import Game from './Game.js';
import ViewGame from './ViewGame.js';
import Controllers from './Controllers.js';

// создаём все три компонента
const game = new Game();
const view = new ViewGame();
const controllers = new Controllers();

// увязываем компоненты друг с другом
game.start(view);
view.start(game);
controllers.start(game);

game.updateView();
controllers.addListeners();
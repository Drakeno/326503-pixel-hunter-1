import {showScreen, showElement, massImageResize} from './utils';
import ErrorModal from './templates/error-modal';
import Loader from './loader';
import Intro from './templates/intro-view';
import Greeting from './templates/greeting-view';
import Rules from './templates/rules-view';
import Game from './templates/game-view';
import StatsView from './templates/stats-view';
import state from './data/state';

let questData;
export default class Application {
  static start() {
    const intro = new Intro(true);
    showScreen(intro.element);
    Loader.loadData().
      catch((error) => Application.showError(error)).
      then((data) => {
        questData = data;
        questData.forEach((element) => {
          element.tasks.forEach((task) => massImageResize(task));
        });
      }).
      then(() => Application.showGreeting());
  }

  static showGreeting() {
    this.currentView = new Greeting();
    showScreen(this.currentView.element);
  }
  static showRules() {
    this.currentView.clear();
    this.currentView = new Rules();
    showScreen(this.currentView.element);
  }
  static showGame(name) {
    if (this.currentView) {
      this.currentView.clear();
    }
    this.currentView = null;
    showScreen(new Game(questData, name).startLevel());
  }
  static showResults(status) {
    const scoreBoard = new StatsView(status);
    showScreen(scoreBoard.element);
    Loader.saveResults(status.currentRound, status.currentRound.name).
      then(() => Loader.loadResults(status.currentRound.name).
        then((data) => scoreBoard.showScores(data)).
        then(state.reset()).
        catch(Application.showError));
  }

  static showError(error) {
    const errorScreen = new ErrorModal(error);
    showElement(errorScreen.element);
  }
}

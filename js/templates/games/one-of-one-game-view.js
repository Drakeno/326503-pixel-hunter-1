import AbstractView from '../../abstract-view';
import AnswerButtonsView from '../items/answer-buttons';
import {ImageType, globalGameData} from '../../data/game-data';
import timer from '../items/timer';
import {renderElement, renderImage} from '../../utils';
import templatesData from '../../data/templates-data';

const DEBUG = globalGameData.DEBUG;
const ANSWER_TYPES = templatesData.gamePage;

export default class OneOfOneGameView extends AbstractView {

  get element() {
    if (this._element) {
      return this._element;
    }
    const wrapper = this.getTemplate();
    this._element = wrapper;
    this.bind();
    return this._element;
  }

  getTemplate() {
    const createOption = (item) => {
      const content = renderElement(``, `form`, `game__content game__content--wide`);
      const properImage = renderImage(item.properImg, `Option 1`);
      const answersButtons = new AnswerButtonsView(`question1`).element;

      const soloOption = renderElement(``, `div`, `game__option`);

      if (DEBUG) {
        let hintText;
        if (item.type === ImageType.PHOTO) {
          hintText = `ФОТО`;
        } else if (item.type === ImageType.PAINT) {
          hintText = `РИСУНОК`;
        }
        const hint = renderElement(hintText, `p`, `game__hint`);
        soloOption.appendChild(hint);
      }

      soloOption.appendChild(properImage);
      soloOption.appendChild(answersButtons);

      content.appendChild(soloOption);

      return content;
    };

    return createOption(this.data.tasks[0]);
  }

  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__answer`);
    super.bind();
  }

  static setGame(element, state, GameView) {
    element.preventDefault();
    timer.stop();
    const userAnswer = element.currentTarget.querySelector(`input`).value;

    let answer;

    if (userAnswer === ANSWER_TYPES.photoAnswer) {
      answer = [ImageType.PHOTO];
    } else if (userAnswer === ANSWER_TYPES.paintAnswer) {
      answer = [ImageType.PAINT];
    }
    state.setResult(answer, timer.getTime());
    GameView.goToNextScreen();
  }
}

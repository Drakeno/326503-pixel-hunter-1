import AbstractView from '../../abstract-view';
import {ImageType, globalGameData} from '../../data/game-data';
import timer from '../items/timer';
import {renderElement, renderImage} from '../../utils';

const DEBUG = globalGameData.DEBUG;

export default class OneOfThreeGameView extends AbstractView {
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
    const createOptions = (tasks) => {
      const content = renderElement(``, `form`, `game__content game__content--triple`);
      tasks.forEach((item) => {
        const index = tasks.indexOf(item) + 1;
        const properImage = renderImage(item.properImg, `Option ${index}`);

        const option = renderElement(``, `div`, `game__option`);

        if (DEBUG) {
          let hintText;
          if (item.type === ImageType.PHOTO) {
            hintText = `ФОТО`;
          } else if (item.type === ImageType.PAINT) {
            hintText = `РИСУНОК`;
          }
          const hint = renderElement(hintText, `p`, `game__hint`);
          option.appendChild(hint);
        }

        if (item.type === ImageType.PHOTO) {
          option.dataset.imageType = ImageType.PHOTO;
        } else {
          option.dataset.imageType = ImageType.PAINT;
        }
        option.appendChild(properImage);

        content.appendChild(option);
      });

      return content;
    };

    return createOptions(this.data.tasks);
  }

  bind() {
    this.actionElements = this.element.querySelectorAll(`.game__option`);
    super.bind();
  }

  static setGame(element, state, GameView) {
    element.preventDefault();
    timer.stop();
    const gameOptions = document.querySelectorAll(`.game__option`);

    const answer = [];
    gameOptions.forEach((option) => {
      const chosenElementType = Number(element.currentTarget.dataset.imageType);
      const optionType = Number(option.dataset.imageType);
      if (option === element.currentTarget) {
        answer.push(chosenElementType);
      } else {
        answer.push(optionType);
      }
    });
    state.setResult(answer, timer.getTime());
    GameView.goToNextScreen();
  }
}

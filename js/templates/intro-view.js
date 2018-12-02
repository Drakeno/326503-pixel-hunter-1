import templatesData from '../data/templates-data';
import AbstractView from '../abstract-view';
import Application from '../application';

export default class IntroView extends AbstractView {
  constructor() {
    super();
    this.callback = (element) => {
      element.preventDefault();
      Application.showGreeting();
    };
  }
  getTemplate(load) {
    return `<section class="intro"><button class="intro__asterisk asterisk ${load ? `load` : ``}" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup>${templatesData.intro.text}</p></section>`;
  }
  bind() {
    this.actionElements = this.element.querySelectorAll(`.intro__asterisk`);
    super.bind();
  }
}

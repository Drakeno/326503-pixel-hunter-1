import AbstractView from '../abstract-view';
import AnswersHistoryView from './items/answers-history';
import BackButtonView from './items/back-button';
import templatesData from '../data/templates-data';
import {globalGameData} from '../data/game-data';
const data = templatesData.statsPage;
const points = globalGameData.Points;

export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  getTemplate() {
    const backBtn = new BackButtonView();
    return `<header class="header">${backBtn.getTemplate()}</header>
  <section class="result">
    <h1>Результаты загружаются...</h1>
  </section>`;
  }

  static setBonusBlock(title, number, pointsForOne, total) {
    return `<tr>
            <td></td>
            <td class="result__extra">${title}</td>
            <td class="result__extra">${number}</td>
            <td class="result__points">× ${pointsForOne}</td>
            <td class="result__total">${total}</td>
            </tr>`;
  }

  showScores(loadedData) {
    const resultsData = loadedData.reverse();

    let resultContainer = ``;
    resultsData.forEach((result) => {
      const round = result.round;
      const answerStats = new AnswersHistoryView(round.stats);
      const mainBlock = `<tr>
        <td class="result__number">${loadedData.indexOf(result) + 1}.</td>
        <td colspan="2">${answerStats.getTemplate()}</td>
        <td class="result__points">${round.isWin ? `× ` + points.CORRECT : ``}</td>
        <td class="result__total">${round.isWin ? round.isCorrect * points.CORRECT : data.statusFail}</td>
      </tr>`;

      let bonusesBlock = ``;

      if (round.isWin && (round.fastBonuses !== null || round.livesBonuses !== null || round.slowFine !== null)) {
        if (round.fastBonuses) {
          bonusesBlock += StatsView.setBonusBlock(data.speedBonusTitle, round.fastBonuses, points.BONUS, round.fastBonuses * points.BONUS);
        }

        if (round.livesBonuses) {
          bonusesBlock += StatsView.setBonusBlock(data.lifeBonusTitle, round.livesBonuses, points.BONUS, round.livesBonuses * points.BONUS);
        }

        if (round.slowFine) {
          bonusesBlock += StatsView.setBonusBlock(data.fineTitle, round.slowFine, points.FINE, round.slowFine * points.FINE);
        }
      }

      const totalBlock = round.isWin ? `<tr><td colspan="5" class="result__total  result__total--final">${round.totalPoints}</td></tr>` : ``;
      resultContainer += `<table class="result__table">${mainBlock}${bonusesBlock}${totalBlock}</table>`;
    });
    const mainResult = loadedData[0].round;
    this._scoreBoardContainer.innerHTML = `<h1>${mainResult.isWin ? data.titleWin : data.titleFail}</h1>
    ${resultContainer}`;
  }

  bind() {
    this.backBtn = this.element.querySelector(`button.back`);
    this.backBtn.addEventListener(`click`, BackButtonView.callback);
    this._scoreBoardContainer = this.element.querySelector(`section.result`);
  }

  clear() {
    this.backBtn.removeEventListener(`click`, BackButtonView.callback);
  }
}


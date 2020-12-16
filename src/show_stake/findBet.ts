import { awaiter, getElement, log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const findBet = async (): Promise<HTMLElement> => {
  const [marketName, betName, parameter] = worker.BetId.split('|');
  log(`Ищем маркет ${marketName}`, 'steelblue');
  getElement('#panel-live-court').then(async (liveCourt) => {
    if (!liveCourt) {
      return;
    }
    log('Появился Live Court', 'steelblue');
    const tornamentButton = document.querySelector(
      '.Sel[id^="ms-live-to"] a'
    ) as HTMLElement;
    if (!tornamentButton) {
      log('Не найдена кнопка турнира', 'crimson');
      return;
    }
    log('Переходим на страницу турнира', 'orange');
    tornamentButton.click();
    const eventButton = (await getElement(
      `.IconMarkets[href*="${new URL(worker.EventUrl).pathname}"]`
    )) as HTMLElement;
    if (!eventButton) {
      log('Не найдена кнопка события', 'crimson');
      return;
    }
    log('Переходим на страницу события', 'orange');
    eventButton.click();
  });
  const marketHeader = await awaiter(() => {
    return [...document.querySelectorAll('.MarketHd')].find((marketElement) => {
      return marketElement.textContent === marketName;
    });
  }, 10000);
  if (!marketHeader) {
    throw new JsFailError('Маркет не найден');
  }
  log('Маркет найден', 'steelblue');
  const market = marketHeader.nextSibling as HTMLElement;
  if (!market) {
    throw new JsFailError('Не найден маркет под заголовком');
  }
  const oddsButtons = [...market.querySelectorAll('.OddsTabL, .OddsTabR')];
  if (oddsButtons.length === 0) {
    throw new JsFailError('Не найдено ни одной ставки в маркете');
  }
  const betButton = oddsButtons.find((button) => {
    const betButtonNameElement = button.querySelector('.OddsL');
    if (!betButtonNameElement) {
      return false;
    }
    const betButtonName = betButtonNameElement.textContent.trim();
    const betButtonParameterElement = button.querySelector('.OddsM');
    const betButtonParameter = betButtonParameterElement
      ? betButtonParameterElement.textContent.trim()
      : Number.NaN;
    return (
      betButtonName === betName &&
      Number(betButtonParameter) === Number(parameter)
    );
  }) as HTMLElement;
  if (!betButton) {
    throw new JsFailError(
      `Не найдена ставка "${betName}"${
        Number.isNaN(Number(parameter))
          ? ''
          : ` (${parameter}). Возможно ставка уже недоступна`
      }`
    );
  }
  const parentTr = betButton.parentElement.parentElement;
  if (parentTr && [...parentTr.classList].includes('OddsClosed')) {
    throw new JsFailError('Ставка недоступна');
  }
  log('Ставка найдена', 'steelblue');
  return betButton;
};

export default findBet;

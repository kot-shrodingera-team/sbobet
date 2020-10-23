import { awaiter, log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const findBet = async (): Promise<HTMLElement> => {
  const [marketName, betName, parameter] = worker.BetId.split('|');
  log('Ищем маркет', 'steelblue');
  const marketHeader = await awaiter(() => {
    return [...document.querySelectorAll('.MarketHd')].find((marketElement) => {
      return marketElement.textContent === marketName;
    });
  }, 10000);
  if (!marketHeader) {
    throw new JsFailError(
      `Не найден подходящий заголовок маркета: "${marketName}"`
    );
  }
  log(`Маркет найден: "${marketName}"`, 'steelblue');
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

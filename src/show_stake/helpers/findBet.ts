import { log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const findBet = async (): Promise<HTMLElement> => {
  const betData = worker.BetId.split('|');
  const [marketName, betName] = betData;
  const parameter = betData[2] === 'null' ? null : betData[2];

  const findMarketCallback = () => {
    return [...document.querySelectorAll('.MarketHd')].find((marketElement) => {
      return marketElement.textContent === marketName;
    });
  };
  const marketHeader = findMarketCallback();

  if (!marketHeader) {
    throw new JsFailError('Маркет не найден');
  }
  log('Маркет найден', 'steelblue');

  const market = marketHeader.nextSibling as HTMLElement;
  if (!market) {
    throw new JsFailError('Не найден маркет под заголовком');
  }
  const oddsButtons = [
    ...market.querySelectorAll<HTMLElement>('.OddsTabL, .OddsTabR'),
  ];
  if (oddsButtons.length === 0) {
    throw new JsFailError('Не найдено ни одной ставки в маркете');
  }
  log(
    `Ищем ставку\n${betName}${parameter === null ? '' : ` (${parameter})`}`,
    'steelblue'
  );
  const betButton = oddsButtons.find((button) => {
    const betButtonNameElement = button.querySelector('.OddsL');
    if (!betButtonNameElement) {
      return false;
    }
    const betButtonName = betButtonNameElement.textContent.trim();
    const betButtonParameterElement = button.querySelector('.OddsM');
    const betButtonParameter = betButtonParameterElement
      ? betButtonParameterElement.textContent.trim()
      : null;
    log(
      `${betButtonName}${
        betButtonParameter === null ? '' : ` (${betButtonParameter})`
      }`,
      'white',
      true
    );
    return (
      betButtonName === betName &&
      Number(betButtonParameter) === Number(parameter)
    );
  });
  if (!betButton) {
    throw new JsFailError('Ставка не найдена');
  }
  const parentTr = betButton.parentElement.parentElement;
  if (parentTr && [...parentTr.classList].includes('OddsClosed')) {
    throw new JsFailError('Ставка недоступна');
  }
  log('Ставка найдена', 'steelblue');
  return betButton;
};

export default findBet;

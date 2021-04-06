import { awaiter, getElement, log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const findBet = async (): Promise<HTMLElement> => {
  const [marketName, betName, parameter] = worker.BetId.split('|');
  log(`Ищем маркет ${marketName}`, 'steelblue');

  const liveCourtSelector = '#panel-live-court';
  const tornamentButtonSelector = '.Sel[id^="ms-live-to"] a';
  const eventButtonSelector = `.IconMarkets[href*="${
    new URL(worker.EventUrl).pathname
  }"]`;
  const allMarketsButtonSelector = '[id="bu:od:go:mt:4"]';
  const findMarketCallback = () => {
    return [...document.querySelectorAll('.MarketHd')].find((marketElement) => {
      return marketElement.textContent === marketName;
    });
  };

  await Promise.any([
    getElement(liveCourtSelector, 10000),
    getElement(allMarketsButtonSelector, 10000),
    awaiter(findMarketCallback, 10000, 50),
  ]);

  const liveCourt = document.querySelector(liveCourtSelector);
  if (liveCourt) {
    log('Появился Live Court', 'steelblue');
    const tornamentButton = document.querySelector(
      tornamentButtonSelector
    ) as HTMLElement;
    if (!tornamentButton) {
      throw new JsFailError('Не найдена кнопка турнира');
    }
    log('Переходим на страницу турнира', 'orange');
    tornamentButton.click();
    const eventButton = (await getElement(eventButtonSelector)) as HTMLElement;
    if (!eventButton) {
      throw new JsFailError('Не найдена кнопка события');
    }
    log('Возвращаемся на страницу события', 'orange');
    eventButton.click();
    await awaiter(findMarketCallback, 10000, 50);
  }

  const allMarketsButton = document.querySelector(
    allMarketsButtonSelector
  ) as HTMLElement;
  const marketHeader = findMarketCallback();
  if (!marketHeader && allMarketsButton) {
    if ([...allMarketsButton.classList].includes('0')) {
      log('Не выбраны все маркеты события. Нажимаем кнопку All', 'orange');
      allMarketsButton.click();
    } else {
      log('Уже выбраны все маркеты события', 'steelblue');
    }
    await awaiter(findMarketCallback, 10000, 50);
  }

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
  log(
    `Ищем ставку\n${betName}${
      Number.isNaN(Number(parameter)) ? '' : ` (${parameter})`
    }`,
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
      : Number.NaN;
    log(
      `${betButtonName}${
        Number.isNaN(betButtonParameter) ? '' : ` (${betButtonParameter})`
      }`,
      'white',
      true
    );
    return (
      betButtonName === betName &&
      Number(betButtonParameter) === Number(parameter)
    );
  }) as HTMLElement;
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

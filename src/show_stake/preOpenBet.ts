import { log, getElement, awaiter } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import { refreshBalance, updateBalance } from '../stake_info/getBalance';
import clearCoupon from './clearCoupon';

const preOpenBet = async (): Promise<void> => {
  await Promise.race([getElement('#distilCaptchaForm'), authStateReady()]);
  if (document.querySelector('#distilCaptchaForm')) {
    worker.Helper.SendInformedMessage('В Sbobet появилась капча');
    throw new JsFailError('Появилась капча');
  }
  worker.Islogin = checkAuth();
  worker.JSLogined();
  if (!worker.Islogin) {
    throw new JsFailError('Нет авторизации');
  }
  log('Есть авторизация', 'steelblue');
  updateBalance();
  await refreshBalance();

  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }

  const [marketName] = worker.BetId.split('|');
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

  await Promise.race([
    getElement(liveCourtSelector, 10000),
    getElement(allMarketsButtonSelector, 10000),
    awaiter(findMarketCallback, 10000, 50),
  ]);

  const liveCourt = document.querySelector(liveCourtSelector);
  const allMarketsButton = document.querySelector<HTMLElement>(
    allMarketsButtonSelector
  );
  if (liveCourt) {
    log('Появился Live Court', 'steelblue');
    const tornamentButton = document.querySelector<HTMLElement>(
      tornamentButtonSelector
    );
    if (!tornamentButton) {
      throw new JsFailError('Не найдена кнопка турнира');
    }
    log('Переходим на страницу турнира', 'orange');
    tornamentButton.click();
    const eventButton = await getElement<HTMLElement>(eventButtonSelector);
    if (!eventButton) {
      throw new JsFailError('Не найдена кнопка события');
    }
    log('Возвращаемся на страницу события', 'orange');
    eventButton.click();
    await awaiter(findMarketCallback, 10000, 50);
  } else if (allMarketsButton) {
    if ([...allMarketsButton.classList].includes('0')) {
      log('Не выбраны все маркеты события. Нажимаем кнопку All', 'orange');
      allMarketsButton.click();
    } else {
      log('Уже выбраны все маркеты события', 'steelblue');
    }
    await awaiter(findMarketCallback, 10000, 50);
  }
};

export default preOpenBet;

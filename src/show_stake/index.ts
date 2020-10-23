import { getElement, checkUrl, log } from '@kot-shrodingera-team/germes-utils';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import clearCoupon from './clearCoupon';
import { updateBalance, refreshBalance } from '../stake_info/getBalance';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';
import openBet from './openBet';
import openEvent from './openEvent';
import preCheck from './preCheck';

let couponOpenning = false;

export const isCouponOpenning = (): boolean => couponOpenning;

const showStake = async (): Promise<void> => {
  localStorage.setItem('couponOpening', '1');
  couponOpenning = true;

  try {
    if (!checkUrl()) {
      log('Открыта не страница конторы (или зеркала)', 'crimson');
      window.location.href = new URL(worker.BookmakerMainUrl).href;
      throw new NewUrlError('Открывает страницу БК');
    }

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

    const couponCleared = await clearCoupon();
    if (!couponCleared) {
      throw new JsFailError('Не удалось очистить купон');
    }
    updateBalance();
    refreshBalance();

    await preCheck();

    await openEvent();

    await openBet();

    log('Ставка успешно открыта', 'green');

    couponOpenning = false;
    localStorage.setItem('couponOpening', '0');
    worker.JSStop();
  } catch (error) {
    if (error instanceof JsFailError) {
      log(error.message, 'red');
      couponOpenning = false;
      localStorage.setItem('couponOpening', '0');
      worker.JSFail();
    }
    if (error instanceof NewUrlError) {
      log(error.message, 'orange');
    }
  }
};

export default showStake;

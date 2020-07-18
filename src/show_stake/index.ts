import { getElement, awaiter } from '@kot-shrodingera-team/config/util';
import authCheckReady from '../initialization/authCheckReady';
import checkAuth from '../stake_info/checkAuth';
import clearCoupon from './clearCoupon';
import findBet from './findBet';
import getStakeCount from '../stake_info/getStakeCount';
import { updateBalance, refreshBalance } from '../stake_info/getBalance';

const showStake = async (): Promise<void> => {
  await authCheckReady();
  worker.Islogin = checkAuth();
  worker.JSLogined();
  if (!worker.Islogin) {
    worker.Helper.WriteLine('Нет авторизации');
    worker.JSFail();
    return;
  }
  (getElement('[id="bu:od:go:mt:4"]') as Promise<HTMLElement>).then(
    (allMarketButton) => {
      if (!allMarketButton) {
        worker.Helper.WriteLine('Не найдена кнопка выбора всех маркетов');
        return;
      }
      if ([...allMarketButton.classList].includes('0')) {
        worker.Helper.WriteLine(
          'Не выбраны все маркеты события. Нажимаем кнопку All'
        );
        allMarketButton.click();
      } else {
        worker.Helper.WriteLine('Уже выбраны все маркеты события');
      }
    }
  );
  const betButton = await findBet();
  updateBalance();
  refreshBalance();
  if (!betButton) {
    worker.JSFail();
    return;
  }
  const parentTr = betButton.parentElement.parentElement;
  if (parentTr && [...parentTr.classList].includes('OddsClosed')) {
    worker.Helper.WriteLine('Ставка недоступна');
    worker.JSFail();
    return;
  }
  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    worker.JSFail();
    return;
  }
  worker.Helper.WriteLine('Нажимаем на ставку');
  betButton.click();
  const betAdded = await awaiter(() => getStakeCount() === 1);
  if (!betAdded) {
    worker.Helper.WriteLine('Ставка не попала в купон');
    worker.JSFail();
    return;
  }
  worker.Helper.WriteLine('Ставка успешно открыта');
  worker.JSStop();
};

export default showStake;

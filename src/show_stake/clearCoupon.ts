import { awaiter } from '@kot-shrodingera-team/config/util';
import getStakeCount from '../stake_info/getStakeCount';

const clearCoupon = async (): Promise<boolean> => {
  const stakeCount = getStakeCount();
  if (stakeCount !== 0) {
    worker.Helper.WriteLine('Купон не пуст. Очищаем');
    const clearCouponButton = document.querySelector('.DelAll') as HTMLElement;
    if (!clearCouponButton) {
      worker.Helper.WriteLine('Не найдена кнопка очистки купона');
      return false;
    }
    clearCouponButton.click();
    const couponCleared = Boolean(await awaiter(() => getStakeCount() === 0));
    if (!couponCleared) {
      worker.Helper.WriteLine('Не удалось очистить купон');
      return false;
    }
    worker.Helper.WriteLine('Купон очищен');
    return true;
  }
  worker.Helper.WriteLine('Купон пуст');
  return true;
};

export default clearCoupon;

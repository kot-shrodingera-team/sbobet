import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import { log } from '@kot-shrodingera-team/germes-utils';
import { getDoStakeTime } from '../stake_info/doStakeTime';

const check = () => {
  const errorMessage = document.querySelector('.Err');
  if (errorMessage) {
    log('Обработка ставки завершена (ошибка ставки)', 'orange');
    return false;
  }
  const betReference = document.querySelector('#bet-slip-content .RefNo');
  if (betReference) {
    const betReferenceText = betReference.textContent.trim();
    const betReferenceRegex = /^Bet Ref (\d+) - (.*)$/;
    if (betReferenceRegex.test(betReferenceText)) {
      log('Обработка ставки завершена (успешная ставка)', 'orange');
      return false;
    }
    log(
      `Обработка ставки (есть Bet Ref, но нет результата - "${betReferenceText}")`,
      'tan'
    );
    return true;
  }
  log('Обработка ставки', 'tan');
  return true;
};

const checkCouponLoading = checkCouponLoadingGenerator({
  getDoStakeTime,
  bookmakerName: '',
  timeout: 60000,
  check,
});

export default checkCouponLoading;

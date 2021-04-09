import doStakeGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/doStake';
import { log } from '@kot-shrodingera-team/germes-utils';
import getCoefficient from '../stake_info/getCoefficient';

const preCheck = (): boolean => {
  // const selectAllCheckBox = document.querySelector<HTMLInputElement>(
  //   '#selectAll'
  // );
  // if (!selectAllCheckBox) {
  //   log('Не найден чекбокс всех ставок. Ставку не делаем', 'crimson');
  //   return false;
  // }
  // if (selectAllCheckBox.disabled) {
  //   log(
  //     'Чекбокс всех ставок недоступен. Скорее всего ставка недоступна. Ставку не делаем',
  //     'crimson'
  //   );
  //   return false;
  // }
  // if (!selectAllCheckBox.checked) {
  //   selectAllCheckBox.checked = true;
  //   log('Переключили чекбокс всех ставок', 'orange');
  // }
  // const betCheckbox = document.querySelector<HTMLInputElement>('#bsChk_0');
  // if (!betCheckbox) {
  //   log('Не найден чекбокс ставки. Ставку не делаем', 'crimson');
  //   return false;
  // }
  // if (betCheckbox.disabled) {
  //   log(
  //     'Чекбокс ставки недоступен. Скорее всего ставка недоступна. Ставку не делаем',
  //     'crimson'
  //   );
  //   return false;
  // }
  // if (!betCheckbox.checked) {
  //   log('Чекбокс ставки выключен. Ставку не делаем', 'crimson');
  //   return false;
  // }
  const errorMessage = document.querySelector('.Err');
  if (errorMessage) {
    log(`Убрали ошибку "${errorMessage.textContent.trim()}"`, 'crimson');
    errorMessage.remove();
  }
  return true;
};

// const postCheck = (): boolean => {
//   return true;
// };

const doStake = doStakeGenerator({
  preCheck,
  doStakeButtonSelector: '#submit-button',
  // errorClasses: [
  //   {
  //     className: '',
  //     message: '',
  //   },
  // ],
  disabledCheck: true,
  getCoefficient,
  // postCheck,
  context: () => document,
});

export default doStake;

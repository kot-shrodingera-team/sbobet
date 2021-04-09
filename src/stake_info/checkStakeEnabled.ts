import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
// import { log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from './getStakeCount';

// const preCheck = (): boolean => {
//   const betCheckbox = document.querySelector<HTMLInputElement>('#bsChk_0');
//   if (!betCheckbox) {
//     log('Не найден чекбокс ставки', 'crimson');
//     return false;
//   }
//   if (betCheckbox.disabled) {
//     log('Чекбокс ставки недоступен. Скорее всего ставка недоступна', 'crimson');
//     return false;
//   }
//   if (!betCheckbox.checked) {
//     betCheckbox.checked = true;
//     log('Переключили чекбокс ставки. Всё ещё счиаем её недоступной', 'crimson');
//     return false;
//   }
//   return true;
// };

const checkStakeEnabled = checkStakeEnabledGenerator({
  // preCheck,
  getStakeCount,
  // betCheck: {
  //   selector: '',
  //   errorClasses: [
  //     {
  //       className: '',
  //       message: '',
  //     },
  //   ],
  // },
  errorsCheck: [
    {
      selector: '.BetSlip.Invalid',
      message: 'заблокирована',
    },
  ],
  context: () => document,
});

export default checkStakeEnabled;

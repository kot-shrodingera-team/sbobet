import {
  balanceReadyGenerator,
  getBalanceGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getBalance';
import { getElement, log } from '@kot-shrodingera-team/germes-utils';

export const balanceSelector = '#bet-credit';
// const balanceRegex = /(\d+(?:\.\d+)?)/;
// const replaceDataArray = [
//   {
//     searchValue: '',
//     replaceValue: '',
//   },
// ];
// const removeRegex = /[\s,']/g;

export const balanceReady = balanceReadyGenerator({
  balanceSelector,
  // balanceRegex,
  // replaceDataArray,
  // removeRegex,
  // context: () => document,
});

const getBalance = getBalanceGenerator({
  balanceSelector,
  // balanceRegex,
  // replaceDataArray,
  // removeRegex,
  // context: () => document,
});

export const updateBalance = (): void => {
  worker.JSBalanceChange(getBalance());
};

export const refreshBalance = async (): Promise<void> => {
  const refreshBalanceButton = document.querySelector<HTMLElement>(
    '#bet-credit-refresh'
  );
  if (!refreshBalanceButton) {
    log('Не найдена кнопка обновления баланса', 'crimson');
    return;
  }
  refreshBalanceButton.click();
  const refreshed = await getElement('#bet-credit-refresh.balance-refresh');
  if (!refreshed) {
    log('не дождались окончания обновления баланса', 'crimson');
  }
  updateBalance();
};

export default getBalance;

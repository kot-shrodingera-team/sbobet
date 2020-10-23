import {
  balanceReadyGenerator,
  getBalanceGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getBalance';
import { getElement } from '@kot-shrodingera-team/germes-utils';

export const balanceReady = balanceReadyGenerator({
  balanceSelector: '#bet-credit',
  // balanceRegex: null,
});

const getBalance = getBalanceGenerator({
  balanceSelector: '#bet-credit',
  // balanceRegex: null,
});

export const updateBalance = (): void => {
  worker.JSBalanceChange(getBalance());
};

export const refreshBalance = async (): Promise<void> => {
  const refreshBalanceButton = document.querySelector(
    '#bet-credit-refresh'
  ) as HTMLElement;
  if (refreshBalanceButton) {
    refreshBalanceButton.click();
    await getElement('#bet-credit-refresh.balance-refresh');
    updateBalance();
  }
};

export default getBalance;

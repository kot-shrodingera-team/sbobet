import { awaiter, getElement } from '@kot-shrodingera-team/config/util';

export const balanceReady = async (
  timeout = 5000,
  interval = 100
): Promise<boolean> => {
  const balanceLoaded = Boolean(
    await awaiter(
      () => {
        const balanceElement = document.querySelector('#bet-credit');
        if (!balanceElement) {
          return false;
        }
        const balance = Number(
          balanceElement.textContent.trim().replace(/,/g, '')
        );
        return !Number.isNaN(balance);
      },
      timeout,
      interval
    )
  );
  return balanceLoaded;
};

const getBalance = (): number => {
  const balanceElement = document.querySelector('#bet-credit');
  if (!balanceElement) {
    worker.Helper.WriteLine('Баланс не найден');
    return 0;
  }
  const balanceText = balanceElement.textContent.trim().replace(/,/g, '');
  const balance = Number(balanceText);
  if (Number.isNaN(balance)) {
    worker.Helper.WriteLine(`Непонятный формат баланса: "${balanceText}"`);
    return 0;
  }
  return balance;
};

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

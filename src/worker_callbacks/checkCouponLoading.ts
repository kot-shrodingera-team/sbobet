let loadingCounter = 0;
let stakeProcessingHungMessageSend = false;

export const clearLoadingCounter = (): void => {
  loadingCounter = 0;
};
export const clearStakeProcessingHungMessageSend = (): void => {
  stakeProcessingHungMessageSend = false;
};

const checkCouponLoading = (): boolean => {
  if (!stakeProcessingHungMessageSend && loadingCounter > 200) {
    const message =
      `В Sbobet очень долгое принятие ставки. Возможно зависание\n` +
      `Событие: ${worker.TeamOne} - ${worker.TeamTwo}\n` +
      `Ставка: ${worker.BetName}\n` +
      `Сумма: ${worker.StakeInfo.Summ}\n`;
    worker.Helper.SendInformedMessage(message);
    worker.Helper.WriteLine('Очень долгое принятие ставки. Возможно зависание');
    stakeProcessingHungMessageSend = true;
  }
  const errorMessage = document.querySelector('.Err');
  if (errorMessage) {
    worker.Helper.WriteLine('Обработка ставки завершена (ошибка ставки)');
    return false;
  }
  const betReference = document.querySelector('#bet-slip-content .RefNo');
  if (betReference) {
    const betReferenceText = betReference.textContent.trim();
    const betReferenceRegex = /^Bet Ref (\d+) - (.*)$/;
    if (betReferenceRegex.test(betReferenceText)) {
      worker.Helper.WriteLine('Обработка ставки завершена (успешная ставка)');
      return false;
    }
    worker.Helper.WriteLine(
      `Обработка ставки (есть Bet Ref, но нет результата - "${betReferenceText}")`
    );
    return true;
  }

  loadingCounter += 1;
  worker.Helper.WriteLine('Обработка ставки');
  return true;
};

export default checkCouponLoading;

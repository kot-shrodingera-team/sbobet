import {
  clearStakeProcessingHungMessageSend,
  clearLoadingCounter,
} from './checkCouponLoading';

const doStake = (): boolean => {
  const betCheckbox = document.querySelector('#bsChk_0') as HTMLInputElement;
  if (!betCheckbox) {
    worker.Helper.WriteLine('Не найден чекбокс ставки');
    return false;
  }
  if (betCheckbox.disabled) {
    worker.Helper.WriteLine(
      'Чекбокс ставки недоступен. Скорее всего ставка недоступна'
    );
    return false;
  }
  if (!betCheckbox.checked) {
    betCheckbox.checked = true;
    worker.Helper.WriteLine('Переключили чекбокс ставки');
  }
  const errorMessage = document.querySelector('.Err');
  if (errorMessage) {
    worker.Helper.WriteLine(
      `Убрали ошибку "${errorMessage.textContent.trim()}"`
    );
    errorMessage.remove();
  }
  const stakeButton = document.querySelector('#submit-button') as HTMLElement;

  if (!stakeButton) {
    worker.Helper.WriteLine(
      'Не найдена кнопка "Сделать ставку". Ставку не сделали'
    );
    return false;
  }
  stakeButton.click();
  worker.Helper.WriteLine('Сделали ставку');
  clearLoadingCounter();
  clearStakeProcessingHungMessageSend();
  return true;
};

export default doStake;

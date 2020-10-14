import {
  clearStakeProcessingHungMessageSend,
  clearLoadingCounter,
} from './checkCouponLoading';

const doStake = (): boolean => {
  const selectAllCheckBox = document.querySelector('#selectAll')  as HTMLInputElement;
  if (!selectAllCheckBox) {
    worker.Helper.WriteLine('Не найден чекбокс всех ставок');
    return false;
  }
  if (selectAllCheckBox.disabled) {
    worker.Helper.WriteLine(
      'Чекбокс всех ставок недоступен. Скорее всего ставка недоступна'
    );
    return false;
  }
  if (!selectAllCheckBox.checked) {
    selectAllCheckBox.checked = true;
    worker.Helper.WriteLine('Переключили чекбокс всех ставок');
  }
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
    worker.Helper.WriteLine('Чекбокс ставки выключен. Ставку не делаем');
    return false;
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

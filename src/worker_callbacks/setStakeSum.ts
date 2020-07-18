import { fireEvent } from '@kot-shrodingera-team/config/util';

const setStakeSum = (sum: number): boolean => {
  worker.Helper.WriteLine(`Вводим сумму ставки: ${sum}`);
  if (!Number.isInteger(sum)) {
    worker.Helper.WriteLine(
      'В БК Сбобет допускаются только целые суммы ставок. Измените округление в настройках БК'
    );
    return false;
  }
  const inputElement = document.querySelector('#stk_0') as HTMLInputElement;
  if (!inputElement) {
    worker.Helper.WriteLine('Поле ввода ставки не найдено');
    return false;
  }
  inputElement.value = String(sum);
  fireEvent(inputElement, 'keyup');
  worker.StakeInfo.Summ = sum;
  return true;
};

export default setStakeSum;

const checkStakeEnabled = (): boolean => {
  const betslipInvalid = document.querySelector('.BetSlip.Invalid');
  if (betslipInvalid) {
    worker.Helper.WriteLine('Ставка заблокирована');
    return false;
  }
  // const selectAllCheckBox = document.querySelector(
  //   '#selectAll'
  // ) as HTMLInputElement;
  // if (!selectAllCheckBox) {
  //   worker.Helper.WriteLine('Не найден чекбокс всех ставок');
  //   return false;
  // }
  // if (selectAllCheckBox.disabled) {
  //   worker.Helper.WriteLine(
  //     'Чекбокс всех ставок недоступен. Скорее всего ставка недоступна'
  //   );
  //   return false;
  // }
  // if (!selectAllCheckBox.checked) {
  //   selectAllCheckBox.checked = true;
  //   worker.Helper.WriteLine('Переключили чекбокс всех ставок');
  // } else {
  //   selectAllCheckBox.checked = false;
  //   selectAllCheckBox.checked = true;
  //   worker.Helper.WriteLine('Дважды переключили чекбокс всех ставок');
  // }
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
    worker.Helper.WriteLine(
      'Переключили чекбокс ставки. Всё ещё счиаем её недоступной'
    );
    return false;
  }
  return true;
};

export default checkStakeEnabled;

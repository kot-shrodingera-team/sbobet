const afterSuccesfulStake = (): void => {
  worker.Helper.WriteLine('Ищем итоговый коэффициент ставки');
  const resultBetInfo = document.querySelector('.BetSlip > strong');
  if (!resultBetInfo) {
    worker.Helper.WriteLine(
      'Не найден элемент, содержащий итоговый коэффициент'
    );
    return;
  }
  if (!resultBetInfo.textContent.includes('@')) {
    worker.Helper.WriteLine(
      'Непонятный формат элемента, содержащего итоговый коэффициент ставки (в нём не найден символ @)'
    );
    return;
  }
  const resultCoefficientText = resultBetInfo.textContent.split('@')[1].trim();
  if (!resultCoefficientText) {
    worker.Helper.WriteLine(
      'Не найден итоговый коэффициент в результате ставки'
    );
    return;
  }
  const resultCoefficient = Number(resultCoefficientText);
  if (Number.isNaN(resultCoefficient)) {
    worker.Helper.WriteLine(
      `Непонятный формат итогового коэффициента: "${resultCoefficientText}"`
    );
    return;
  }
  if (resultCoefficient !== worker.StakeInfo.Coef) {
    worker.Helper.WriteLine(
      `Коеффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`
    );
    worker.StakeInfo.Coef = resultCoefficient;
    return;
  }
  worker.Helper.WriteLine('Коеффициент не изменился');
};

export default afterSuccesfulStake;

const getCoefficient = (): number => {
  const coefficientText = ((): string => {
    const newOdds = document.querySelector('.NewOdds');
    if (newOdds) {
      return newOdds.textContent.trim();
    }
    const betInfo = document.querySelector('.BetInfo > strong');
    if (!betInfo || !betInfo.textContent.includes('@')) {
      return null;
    }
    return betInfo.textContent.split('@')[1].trim();
  })();
  if (!coefficientText) {
    worker.Helper.WriteLine('Коэффициент не найден');
    return 0;
  }
  const coefficient = Number(coefficientText);
  if (Number.isNaN(coefficient)) {
    worker.Helper.WriteLine(
      `Непонятный формат коэффициента: "${coefficientText}"`
    );
    return 0;
  }
  return coefficient;
};

export default getCoefficient;

const getMinimumStake = (): number => {
  const minimumStakeElement = document.querySelector(
    '.MinMax > span:nth-child(1)'
  );
  if (!minimumStakeElement) {
    worker.Helper.WriteLine('Не найдена минимальная сумма ставки');
    return 0;
  }
  const minimumStakeText = minimumStakeElement.textContent
    .trim()
    .replace(/,/g, '');
  const minimumStakeRegex = /.* (\d+(?:\.\d+)?)$/;
  const minimumStakeMatch = minimumStakeText.match(minimumStakeRegex);
  if (!minimumStakeMatch) {
    worker.Helper.WriteLine(
      `Непонятный формат минимальной ставки: "${minimumStakeText}"`
    );
    return 0;
  }
  const minimumStake = Number(minimumStakeMatch[1]);
  return minimumStake;
};

export default getMinimumStake;

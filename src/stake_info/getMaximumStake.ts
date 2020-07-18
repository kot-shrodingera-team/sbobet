const getMaximumStake = (): number => {
  const maximumStakeElement = document.querySelector(
    '.MinMax > span:nth-child(2)'
  );
  if (!maximumStakeElement) {
    worker.Helper.WriteLine('Не найдена максимальная сумма ставки');
    return 0;
  }
  const maximumStakeText = maximumStakeElement.textContent
    .trim()
    .replace(/,/g, '');
  const maximumStakeRegex = /.* (\d+(?:\.\d+)?)$/;
  const maximumStakeMatch = maximumStakeText.match(maximumStakeRegex);
  if (!maximumStakeMatch) {
    worker.Helper.WriteLine(
      `Непонятный формат максимальной ставки: "${maximumStakeText}"`
    );
    return 0;
  }
  const maximumStake = Number(maximumStakeMatch[1]);
  return maximumStake;
};

export default getMaximumStake;

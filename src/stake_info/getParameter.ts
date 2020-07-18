const getParameter = (): number => {
  const betInfo = document.querySelector('.BetInfo');
  if (!betInfo) {
    worker.Helper.WriteLine('Не найдена информация о ставке');
    return -9999;
  }
  const marketName = betInfo.childNodes[0].textContent.trim();
  if (!marketName.includes(':')) {
    return -6666;
  }
  // First Half Asian Handicap:+0.25 @ 0 - 0
  // Over Under:+1.75
  const parameterRegex = /^.*:([-+]?\d+(?:\.\d+)?)(?: @ (\d+) - (\d+))?$/;
  const parameterMatch = marketName.match(parameterRegex);
  if (!parameterMatch) {
    worker.Helper.WriteLine(
      `Не удалось определить параметр из маркета: "${marketName}"`
    );
    return -9999;
  }
  const parameter = Number(parameterMatch[1]);
  const leftScore = parameterMatch[2];
  const rightScore = parameterMatch[3];
  if (leftScore && rightScore) {
    worker.Helper.WriteLine('Расчёт параметра от форы');
    const teamNamesElement = document.querySelector('.Event label');
    if (!teamNamesElement) {
      worker.Helper.WriteLine('Не найдены названия команд в заголовке купона');
      return -9999;
    }
    const teamNamesRegex = /^(.*) -vs- (.*)$/;
    const teamNamesMatch = teamNamesElement.textContent
      .trim()
      .match(teamNamesRegex);
    if (!teamNamesMatch) {
      worker.Helper.WriteLine(
        `Не удалось получить названия команд из заголовка купона: "${teamNamesElement.textContent}"`
      );
      return -9999;
    }
    const leftTeamName = teamNamesMatch[1].trim();
    const rightTeamName = teamNamesMatch[2].trim();
    const betNameText = document
      .querySelector('.BetInfo strong')
      .childNodes[0].textContent.trim();
    if (!betNameText) {
      worker.Helper.WriteLine('Не найдена вторая часть росписи ставки');
      return -9999;
    }
    const betNameRegex = /^(.*)@/;
    const betNameMatch = betNameText.match(betNameRegex);
    if (!betNameMatch) {
      worker.Helper.WriteLine(
        `Не удалось получить название команды из второй части росписи ставки: "${betNameText}"`
      );
      return -9999;
    }
    const teamName = betNameMatch[1].trim();
    if (![leftTeamName, rightTeamName].includes(teamName)) {
      worker.Helper.WriteLine(
        'Название команды из второй части росписи ставки не найдено в заголовке купона'
      );
      worker.Helper.WriteLine(
        `${teamName} ? [${leftTeamName}, ${rightTeamName}]`
      );
      return -9999;
    }
    const scoreOffset =
      teamName === rightTeamName
        ? Number(leftScore) - Number(rightScore)
        : Number(rightScore) - Number(leftScore);
    return parameter + scoreOffset;
  }
  return parameter;
};

export default getParameter;

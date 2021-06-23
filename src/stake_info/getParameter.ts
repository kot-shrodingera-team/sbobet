import { getWorkerParameter, log } from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  if (
    getWorkerParameter('fakeParameter') ||
    getWorkerParameter('fakeOpenStake')
  ) {
    const parameter = Number(JSON.parse(worker.ForkObj).param);
    if (Number.isNaN(parameter)) {
      return -6666;
    }
    return parameter;
  }

  const betInfoSelector = '.BetInfo';
  const eventNameSelector = '.Event label';

  const betInfo = document.querySelector(betInfoSelector);
  if (!betInfo) {
    log('Не найдена информация о ставке', 'crimson');
    return -9999;
  }
  // const marketName = betInfo.childNodes[0].textContent.trim();
  const marketName = [...betInfo.childNodes].reduce(
    (accumulator, currentValue) => {
      if (currentValue.nodeType === Node.TEXT_NODE) {
        return `${accumulator} ${currentValue.textContent.trim()}`;
      }
      return accumulator;
    },
    ''
  );
  if (!marketName.includes(':')) {
    return -6666;
  }

  // First Half Asian Handicap:+0.25 @ 0 - 0
  // Over Under:+1.75
  const parameterRegex = /^.*:([-+]?\d+(?:\.\d+)?)(?: @ (\d+) - (\d+))?$/;
  const parameterMatch = marketName.match(parameterRegex);
  if (!parameterMatch) {
    log(
      `Не удалось определить параметр из маркета: "${marketName}"`,
      'crimson'
    );
    return -9999;
  }
  const parameter = Number(parameterMatch[1]);
  const leftScore = parameterMatch[2];
  const rightScore = parameterMatch[3];
  if (leftScore && rightScore) {
    log('Расчёт параметра от форы', 'steelblue');
    const teamNamesElement = document.querySelector(eventNameSelector);
    if (!teamNamesElement) {
      log('Не найдены названия команд в заголовке купона', 'crimson');
      return -9999;
    }
    const teamNames = teamNamesElement.textContent.trim();
    const teamNamesRegex = /^(.*) -vs- (.*)$/;
    const teamNamesMatch = teamNames.match(teamNamesRegex);
    if (!teamNamesMatch) {
      log(
        `Не удалось получить названия команд из заголовка купона: "${teamNames}"`,
        'crimson'
      );
      return -9999;
    }
    const leftTeamName = teamNamesMatch[1].trim();
    const rightTeamName = teamNamesMatch[2].trim();
    const betInfoSecondPartElement = betInfo.querySelector('strong');
    if (!betInfoSecondPartElement) {
      log('Не найдена вторая часть информации о ставке', 'crimson');
      return -9999;
    }
    const betNameElement = betInfoSecondPartElement.firstChild;
    if (!betNameElement) {
      log('Не найден исход', 'crimson');
      return -9999;
    }
    const betName = betNameElement.textContent.trim();
    const betNameRegex = /^(.*)@/;
    const betNameMatch = betName.match(betNameRegex);
    if (!betNameMatch) {
      log(
        `Не удалось получить название команды из исхода: "${betName}"`,
        'crimson'
      );
      return -9999;
    }
    const teamName = betNameMatch[1].trim();
    if (![leftTeamName, rightTeamName].includes(teamName)) {
      log(
        'Название команды из исхода не найдено в заголовке купона',
        'crimson'
      );
      log(`${teamName} ? [${leftTeamName}, ${rightTeamName}]`, 'crimson');
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

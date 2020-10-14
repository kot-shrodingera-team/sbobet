import { awaiter } from '@kot-shrodingera-team/config/util';

const findBet = async (): Promise<HTMLElement> => {
  const betData = worker.BetId.split('|');
  const marketName = betData[0];
  const betName = betData[1];
  const parameter = betData[2];
  worker.Helper.WriteLine('Ищем маркет');
  const marketHeader = await awaiter(() => {
    return [...document.querySelectorAll('.MarketHd')].find((marketElement) => {
      return marketElement.textContent === marketName;
    });
  }, 10000);
  if (!marketHeader) {
    worker.Helper.WriteLine(
      `Не найден подходящий заголовок маркета: "${marketName}"`
    );
    return null;
  }
  worker.Helper.WriteLine(`Маркет найден: "${marketName}"`);
  const market = marketHeader.nextSibling;
  if (!market) {
    worker.Helper.WriteLine('Не найден маркет под заголовком');
    return null;
  }
  const oddsButtons = [...market.querySelectorAll('.OddsTabL, .OddsTabR')];
  if (oddsButtons.length === 0) {
    worker.Helper.WriteLine('Не найден ни одной ставке в маркете');
    return null;
  }
  const betButton = oddsButtons.find((button) => {
    const betButtonNameElement = button.querySelector('.OddsL');
    if (!betButtonNameElement) {
      return false;
    }
    const betButtonName = betButtonNameElement.textContent.trim();
    const betButtonParameterElement = button.querySelector('.OddsM');
    const betButtonParameter = betButtonParameterElement
      ? betButtonParameterElement.textContent.trim()
      : Number.NaN;
    return (
      betButtonName === betName &&
      Number(betButtonParameter) === Number(parameter)
    );
  });
  if (!betButton) {
    worker.Helper.WriteLine(
      `Не найдена ставка "${betName}"${
        Number.isNaN(Number(parameter))
          ? ''
          : ` (${parameter}). Возможно ставка уже недоступна`
      }`
    );
    return null;
  }
  worker.Helper.WriteLine('Ставка найдена');
  return betButton;
};

export default findBet;

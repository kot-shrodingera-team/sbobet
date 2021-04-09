import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';
import { log } from '@kot-shrodingera-team/germes-utils';

const getCoefficientText = (): string => {
  const newOdds = document.querySelector('.NewOdds');
  if (newOdds) {
    return newOdds.textContent.trim();
  }
  const betInfo = document.querySelector('.BetInfo > strong');
  if (!betInfo) {
    log('Не найден коэффициент', 'crimson');
  }
  const betInfoText = betInfo.textContent.trim();
  if (!betInfoText.includes('@')) {
    log(`Непонятный формат коэффициента: "${betInfoText}"`, 'crimson');
    return null;
  }
  return betInfoText.split('@')[1].trim();
};

const getCoefficient = getCoefficientGenerator({
  coefficientSelector: '',
  getCoefficientText,
  // replaceDataArray: [
  //   {
  //     searchValue: '',
  //     replaceValue: '',
  //   },
  // ],
  // removeRegex: /[\s,']/g,
  // coefficientRegex: /(\d+(?:\.\d+)?)/,
  // context: () => document,
});

export default getCoefficient;

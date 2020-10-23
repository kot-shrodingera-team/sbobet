import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';
import { log } from '@kot-shrodingera-team/germes-utils';

const getResultCoefficient = getCoefficientGenerator({
  coefficientSelector: '.BetSlip > strong',
  coefficientRegex: /@\s+(\d+(?:\.\d+)?)/,
});

const afterSuccesfulStake = (): void => {
  log('Обновление итогового коэффициента', 'steelbue');
  const resultCoefficient = getResultCoefficient();
  if (resultCoefficient !== worker.StakeInfo.Coef) {
    log(
      `Коеффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`,
      'orange'
    );
    worker.StakeInfo.Coef = resultCoefficient;
    return;
  }
  log('Коеффициент не изменился', 'lightblue');
};

export default afterSuccesfulStake;

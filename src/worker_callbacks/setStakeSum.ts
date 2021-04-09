import setStakeSumGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';
import { log } from '@kot-shrodingera-team/germes-utils';
import { sumInputSelector } from '../stake_info/getCurrentSum';

const preInputCheck = (sum: number): boolean => {
  if (!Number.isInteger(sum)) {
    log(
      'В БК Сбобет допускаются только целые суммы ставок. Измените округление в настройках БК',
      'crimson'
    );
    return false;
  }
  return true;
};

const setStakeSum = setStakeSumGenerator({
  sumInputSelector,
  alreadySetCheck: {
    falseOnSumChange: false,
  },
  preInputCheck,
  inputType: 'fireEvent',
  fireEventNames: ['keyup'],
  context: () => document,
});

export default setStakeSum;

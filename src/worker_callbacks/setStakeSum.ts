import setStakeSumGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';
import { log } from '@kot-shrodingera-team/germes-utils';

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
  sumInputSelector: '#stk_0',
  alreadySetCheck: true,
  inputType: 'fireEvent',
  fireEventName: 'keyup',
  preInputCheck,
});

export default setStakeSum;

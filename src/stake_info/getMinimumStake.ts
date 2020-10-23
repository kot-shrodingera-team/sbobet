import getMinimumStakeGenerator, {
  minimumStakeReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getMinimumStake';

export const minimumStakeReady = minimumStakeReadyGenerator({
  minimumStakeElementSelector: '.MinMax > span:nth-child(1)',
  minimumStakeRegex: null,
});

const getMinimumStake = getMinimumStakeGenerator({
  minimumStakeElementSelector: '.MinMax > span:nth-child(1)',
  minimumStakeRegex: null,
});

export default getMinimumStake;

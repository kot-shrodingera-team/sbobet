import getMaximumStakeGenerator, {
  maximumStakeReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getMaximumStake';

export const maximumStakeReady = maximumStakeReadyGenerator({
  maximumStakeElementSelector: '.MinMax > span:nth-child(2)',
  maximumStakeRegex: null,
});

const getMaximumStake = getMaximumStakeGenerator({
  maximumStakeElementSelector: '.MinMax > span:nth-child(2)',
  maximumStakeRegex: null,
});

export default getMaximumStake;

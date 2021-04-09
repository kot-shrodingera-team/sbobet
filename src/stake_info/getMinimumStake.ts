import getMinimumStakeGenerator, {
  minimumStakeReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getMinimumStake';

const minimumStakeSelector = '.MinMax > span:nth-child(1)';
// const minimumStakeRegex = /(\d+(?:\.\d+)?)/;
// const replaceDataArray = [
//   {
//     searchValue: '',
//     replaceValue: '',
//   },
// ];
// const removeRegex = /[\s,']/g;

export const minimumStakeReady = minimumStakeReadyGenerator({
  minimumStakeSelector,
  // minimumStakeRegex,
  // replaceDataArray,
  // removeRegex,
  // context: () => document,
});

const getMinimumStake = getMinimumStakeGenerator({
  minimumStakeSelector,
  // minimumStakeRegex,
  // replaceDataArray,
  // removeRegex,
  // disableLog: false,
  // context: () => document,
});

export default getMinimumStake;

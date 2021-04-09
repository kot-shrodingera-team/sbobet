import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

// id добавлен, чтобы не определяло купоны с результатом

const getStakeCount = getStakeCountGenerator({
  stakeSelector: '#bet-slip-content .BetSlip[id]',
  // context: () => document,
});

export default getStakeCount;

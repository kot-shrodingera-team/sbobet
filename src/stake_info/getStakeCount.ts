const getStakeCount = (): number => {
  return document.querySelectorAll('#bet-slip-content .BetSlip').length;
};

export default getStakeCount;

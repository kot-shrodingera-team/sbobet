const getStakeCount = (): number => {
  return document.querySelectorAll('.BetSlip').length;
};

export default getStakeCount;

const checkStakeEnabled = (): boolean => {
  const betslipInvalid = document.querySelector('.BetSlip.Invalid');
  return !betslipInvalid;
};

export default checkStakeEnabled;

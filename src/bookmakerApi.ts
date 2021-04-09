declare global {}

export const clearGermesData = (): void => {
  window.germesData = {
    bookmakerName: 'Sbobet',
    betProcessingStep: undefined,
    betProcessingAdditionalInfo: undefined,
    doStakeTime: undefined,
    betProcessingTimeout: 50000,
  };
};

export default {};

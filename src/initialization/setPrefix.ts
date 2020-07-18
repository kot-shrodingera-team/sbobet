const setPrefix = (): void => {
  worker.SetSessionData(
    'SbobetPrefix',
    new URL(window.location.href).host.split('.')[0]
  );
};

export default setPrefix;

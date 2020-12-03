const afterSuccesfulLogin = async (): Promise<void> => {
  const prefix = new URL(window.location.href).host.split('.')[0];
  window.localStorage.setItem('SbobetPrefix', prefix);
  worker.SetSessionData('SbobetPrefix', prefix);
};

export default afterSuccesfulLogin;

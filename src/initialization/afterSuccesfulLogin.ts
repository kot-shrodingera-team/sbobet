const afterSuccesfulLogin = async (): Promise<void> => {
  const prefix = new URL(window.location.href).host.split('.')[0];
  worker.SetSessionData('Sbobet.Prefix', prefix);
  localStorage.setItem('couponOpening', '0');
};

export default afterSuccesfulLogin;

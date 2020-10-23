const afterSuccesfulLogin = async (): Promise<void> => {
  window.localStorage.setItem(
    'SbobetPrefix',
    new URL(window.location.href).host.split('.')[0]
  );
};

export default afterSuccesfulLogin;

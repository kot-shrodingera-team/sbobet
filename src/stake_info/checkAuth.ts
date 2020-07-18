const checkAuth = (): boolean => {
  const userName = document.querySelector('#login-name');
  return Boolean(userName);
};

export default checkAuth;

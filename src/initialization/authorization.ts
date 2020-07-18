import {
  fireEvent,
  getElement,
  sleep,
} from '@kot-shrodingera-team/config/util';

const authorization = async (): Promise<boolean> => {
  await getElement('.MainWrapper');
  const loginInput = document.querySelector('#username') as HTMLInputElement;
  if (!loginInput) {
    worker.Helper.WriteLine('Не найдено поле ввода логина');
    return;
  }
  loginInput.value = worker.Login;
  fireEvent(loginInput, 'input');
  const passwordInput = document.querySelector('#password') as HTMLInputElement;
  if (!passwordInput) {
    worker.Helper.WriteLine('Не найдено поле ввода пароля');
    return;
  }
  passwordInput.value = worker.Password;
  fireEvent(passwordInput, 'input');
  // const loginSubmitButton = document.querySelector('.sign-in') as HTMLElement;
  // if (!loginSubmitButton) {
  //   worker.Helper.WriteLine('Не найдена кнопка входа');
  //   return;
  // }
  // worker.Helper.WriteLine('Нажимаем на кнопку входа');
  // loginSubmitButton.click();
  await sleep(1000);
  $M('tb').onSignIn();
  worker.LoginTry += 1;
};

export default authorization;

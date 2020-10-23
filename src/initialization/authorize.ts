import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
// import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

// const setLoginType = async (): Promise<boolean> => {
//   return true;
// };

const authorize = authorizeGenerator({
  // openForm: {
  //   selector: '',
  //   openedSelector: '',
  //   afterOpenDelay: 1000,
  // },
  // setLoginType,
  loginInputSelector: '#username',
  passwordInputSelector: '#password',
  submitButtonSelector: '.sign-in',
  inputType: 'fireEvent',
  beforeSubmitDelay: 1000,
  // captchaSelector: '',
  // loginedWait: {
  //   loginedSelector: '',
  //   balanceReady,
  //   updateBalance,
  // },
  // afterSuccesfulLogin,
});

export default authorize;

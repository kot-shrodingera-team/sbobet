import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const noAuthElementSelector = '#username';
export const authElementSelector = '#login-name';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector,
  authElementSelector,
  maxDelayAfterNoAuthElementAppeared: 3000,
  // context: () => document,
});

const checkAuth = checkAuthGenerator({
  authElementSelector,
  // context: () => document,
});

export default checkAuth;

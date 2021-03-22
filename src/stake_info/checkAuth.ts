import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector: '#username',
  authElementSelector: '#login-name',
  maxDelayAfterNoAuthElementAppeared: 3000,
  logging: true,
});

const checkAuth = checkAuthGenerator({
  authElementSelector: '#login-name',
});

export default checkAuth;

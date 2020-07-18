import { getElement } from '@kot-shrodingera-team/config/util';

const authCheckReady = async (timeout = 5000): Promise<void> => {
  await Promise.race([
    getElement('#username', timeout),
    getElement('#login-name', timeout),
  ]);
};

export default authCheckReady;

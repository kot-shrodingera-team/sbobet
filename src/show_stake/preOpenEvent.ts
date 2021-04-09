import { checkBookerHost, log } from '@kot-shrodingera-team/germes-utils';
import { NewUrlError } from '@kot-shrodingera-team/germes-utils/errors';

const preOpenEvent = async (): Promise<void> => {
  if (!checkBookerHost()) {
    log('Открыта не страница конторы (или зеркала)', 'crimson');
    window.location.href = new URL(worker.BookmakerMainUrl).href;
    throw new NewUrlError('Открываем страницу БК');
  }
};

export default preOpenEvent;

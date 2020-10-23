import { log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';

const preCheck = async (): Promise<void> => {
  const prefix = window.localStorage.getItem('SbobetPrefix');
  if (!prefix) {
    throw new JsFailError(
      'Не найден поддомен. Невозможно сформировать корректный URL'
    );
  }
  const url = new URL(worker.EventUrl).href.replace(
    /^https?:\/\/(www\.)?sbobet\.com/,
    // `https://${prefix}.sbobet.com`
    // eslint-disable-next-line prefer-template
    'https://' + prefix + '.sbobet.com'
  );
  if (window.location.href === url) {
    log('Открыта страница нужного события', 'steelblue');
    return;
  }
  log('Открыта не страница нужного события', 'steelblue');
  window.location.href = url;
  throw new NewUrlError('Переходим на страницу события');
};

export default preCheck;

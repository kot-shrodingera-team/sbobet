import { log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';

const preCheck = async (): Promise<void> => {
  // const prefix = window.localStorage.getItem('SbobetPrefix');
  const prefix = worker.GetSessionData('SbobetPrefix');
  if (!prefix) {
    throw new JsFailError(
      'Не найден поддомен. Невозможно сформировать корректный URL'
    );
  }
  if (window.location.href.includes(worker.EventId)) {
    log('Открыта страница нужного события', 'steelblue');
    return;
  }
  log('Открыта не страница нужного события', 'steelblue');
  const url = new URL(worker.EventUrl).href.replace(
    /^https?:\/\/(www\.)?sbobet\.com/,
    // `https://${prefix}.sbobet.com`
    // eslint-disable-next-line prefer-template
    'https://' + prefix + '.sbobet.com'
  );
  window.location.href = url;
  throw new NewUrlError('Переходим на страницу события');
};

export default preCheck;

import { log } from '@kot-shrodingera-team/germes-utils';
import {
  JsFailError,
  NewUrlError,
} from '@kot-shrodingera-team/germes-utils/errors';

const openEvent = async (): Promise<void> => {
  const prefix = worker.GetSessionData('Sbobet.Prefix');
  if (!prefix) {
    throw new JsFailError(
      'Не найден поддомен. Невозможно сформировать корректный URL'
    );
  }
  if (!window.location.href.includes(worker.EventId)) {
    log('Открыта не страница нужного события', 'steelblue');
    const url = new URL(worker.EventUrl).href.replace(
      /^https?:\/\/(www\.)?sbobet\.com/,
      // eslint-disable-next-line no-useless-escape
      `https:\/\/${prefix}.sbobet.com`
    );
    window.location.href = url;
    throw new NewUrlError('Переходим на страницу события');
  }
  log('Открыта страница нужного события', 'steelblue');
};

export default openEvent;

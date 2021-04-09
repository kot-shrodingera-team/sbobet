import {
  getElement,
  log,
  repeatingOpenBet,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import getStakeCount from '../stake_info/getStakeCount';
import findBet from './helpers/findBet';

const openBet = async (): Promise<void> => {
  // Проверка формата коэффициентов
  const priceStyle = await getElement('#tb-price-style', 10000);
  if (!priceStyle) {
    throw new JsFailError('Не найден текущий формат коэффициентов');
  }
  if (!priceStyle.classList.contains('odds-type-4')) {
    log('Выбран не десятичный формат коэффициентов', 'steelblue');
    const decCoefficientButton = document.querySelector<HTMLElement>(
      '[onclick="javascript:$M(\'od\').onPriceStyle(4);"]'
    );
    if (!decCoefficientButton) {
      throw new JsFailError(
        'Не найдена кнопка переключенния на десятичный формат коэффициентов'
      );
    }
    log('Переключаем не десятичный формат коэффициентов', 'orange');
    decCoefficientButton.click();
  } else {
    log('Выбран десятичный формат коэффициентов', 'steelblue');
  }

  // Поиск ставки
  const bet = await findBet();

  // Открытие ставки, проверка, что ставка попала в купон
  const openingAction = async () => {
    bet.click();
  };
  await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);

  const eventNameSelector = '.Event label';
  const betInfoSelector = '.BetInfo';

  const eventNameElement = document.querySelector(eventNameSelector);
  const betInfoElement = document.querySelector(betInfoSelector);

  if (!eventNameElement) {
    throw new JsFailError('Не найдено событие открытой ставки');
  }
  if (!betInfoElement) {
    throw new JsFailError('Не найдена информация о ставке');
  }

  const eventName = eventNameElement.textContent.trim();
  const betInfo = betInfoElement.textContent.trim().replace(/ +/g, ' ');

  log(`Открыта ставка\n${eventName}\n${betInfo}`, 'steelblue');
};

export default openBet;

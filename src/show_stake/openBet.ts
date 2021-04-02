import { awaiter, getElement, log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from '../stake_info/getStakeCount';
import JsFailError from './errors/jsFailError';
import findBet from './findBet';

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

  const bet = await findBet();

  const maxTryCount = 5;
  for (let i = 1; i <= maxTryCount; i += 1) {
    bet.click();
    // eslint-disable-next-line no-await-in-loop
    const betAdded = await awaiter(() => getStakeCount() === 1, 1000, 50);

    if (!betAdded) {
      if (i === maxTryCount) {
        throw new JsFailError('Ставка так и не попала в купон');
      }
      log(`Ставка не попала в купон (попытка ${i})`, 'steelblue');
    } else {
      log('Ставка попала в купон', 'steelblue');
      break;
    }
  }
};

export default openBet;

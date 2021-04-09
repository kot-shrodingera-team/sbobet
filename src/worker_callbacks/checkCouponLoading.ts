import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import {
  awaiter,
  checkCouponLoadingError,
  checkCouponLoadingSuccess,
  getElement,
  getRemainingTimeout,
  log,
  // toFormData,
} from '@kot-shrodingera-team/germes-utils';
import { updateBalance, refreshBalance } from '../stake_info/getBalance';

const betCheckboxSelector = '#bsChk_0';
const totalStakeSelector = '#tstake';
const totalStakeRegex = /(\d+)$/;
const doStakeButtonSelector = '#submit-button';

const errorSelector = '.Err';
const betReferenceSelector = '#bet-slip-content .RefNo';
const betReferenceRegex = /^Bet Ref (\d+) - (.*)$/;

const asyncCheck = async () => {
  window.germesData.betProcessingStep = 'waitingForLoaderOrResult';

  const betCheckbox = document.querySelector<HTMLInputElement>(
    betCheckboxSelector
  );
  if (!betCheckbox) {
    return checkCouponLoadingError({
      botMessage: 'Не найден чекбокс ставки',
      informMessage: 'Не найден чекбокс ставки',
    });
  }
  if (betCheckbox.disabled) {
    return checkCouponLoadingError({
      botMessage: 'Чекбокс ставки недоступен',
      informMessage: 'Чекбокс ставки недоступен',
    });
  }
  if (!betCheckbox.checked) {
    log('Чекбокс ставки выключен. Переключаем', 'orange');
    betCheckbox.click();
    const betEnabled = await awaiter(() => {
      const totalStakeElement = document.querySelector(totalStakeSelector);
      if (!totalStakeElement) {
        return false;
      }
      const totalStake = totalStakeElement.textContent.trim();
      const totalStakeMath = totalStake.match(totalStakeRegex);
      if (!totalStakeMath) {
        return false;
      }
      const totalStakeNumber = Number(totalStakeMath[1]);
      return totalStakeNumber !== 0;
    }, getRemainingTimeout(5000));
    if (!betEnabled) {
      return checkCouponLoadingError({
        botMessage: 'Ставка не переключилась в доступную',
        informMessage: 'Ставка не переключилась в доступную',
      });
    }

    const doStakeButton = document.querySelector<HTMLElement>(
      doStakeButtonSelector
    );
    if (!doStakeButton) {
      return checkCouponLoadingError({
        botMessage: 'Не найдена кнопка ставки',
        informMessage: 'Не найдена кнопка ставки',
      });
    }
    doStakeButton.click();
  }

  await Promise.race([
    getElement(errorSelector, getRemainingTimeout()),
    getElement(betReferenceSelector, getRemainingTimeout()),
  ]);

  const errorElement = document.querySelector(errorSelector);
  const betReferenceElement = document.querySelector(betReferenceSelector);

  if (errorElement) {
    const errorText = errorElement.textContent.trim();
    log(errorText, 'tomato');
    return checkCouponLoadingError({});
  }

  if (betReferenceElement) {
    const betReferenceAppeard = await awaiter(() => {
      const betReference = betReferenceElement.textContent.trim();
      return betReferenceRegex.test(betReference);
    }, getRemainingTimeout());

    if (!betReferenceAppeard) {
      return checkCouponLoadingError({
        botMessage: `Не удалось определить результат ставки из купона: "${betReferenceElement.textContent.trim()}"`,
        informMessage: `Не удалось определить результат ставки из купона: "${betReferenceElement.textContent.trim()}"`,
      });
    }

    const betReference = betReferenceElement.textContent.trim();
    const betReferenceMatch = betReference.match(betReferenceRegex);
    const betReferenceNumber = betReferenceMatch[1];
    const betResult = betReferenceMatch[2];
    log(`BetRef: ${betReferenceNumber}`, 'steelblue');
    log(`Результат: ${betResult}`, 'steelblue');
    if (betResult === 'Rejected') {
      return checkCouponLoadingError({});
    }
    if (['Accepted', 'Waiting'].includes(betResult)) {
      // const bodyData = toFormData({
      //   bot_api: worker.ApiKey,
      //   fork_id: worker.ForkId,
      //   sbobet_bet_id: betReferenceNumber,
      // });
      // fetch('https://strike.ws/sbobet_bet_ids.php', {
      //   method: 'POST',
      //   body: bodyData,
      // });
      updateBalance();
      refreshBalance();

      return checkCouponLoadingSuccess('Ставка принята');
    }

    return checkCouponLoadingError({
      botMessage: `Неизвестный результат ставки: "${betResult}"`,
      informMessage: `Неизвестный результат ставки: "${betResult}"`,
    });
  }

  return checkCouponLoadingError({
    botMessage: 'Не дождались результата ставки',
    informMessage: 'Не дождались результата ставки',
  });
};

const check = () => {
  const step = window.germesData.betProcessingStep;
  const additionalInfo = window.germesData.betProcessingAdditionalInfo
    ? ` (${window.germesData.betProcessingAdditionalInfo})`
    : '';
  switch (step) {
    case 'beforeStart':
      asyncCheck();
      return true;
    case 'error':
    case 'success':
    case 'reopened':
      log(`Обработка ставки завершена (${step})${additionalInfo}`, 'orange');
      return false;
    default:
      log(`Обработка ставки (${step})${additionalInfo}`, 'tan');
      return true;
  }
};

const checkCouponLoading = checkCouponLoadingGenerator({
  check,
});

export default checkCouponLoading;

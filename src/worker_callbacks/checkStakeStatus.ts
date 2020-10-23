import { log, toFormData } from '@kot-shrodingera-team/germes-utils';
import { updateBalance, refreshBalance } from '../stake_info/getBalance';

const checkStakeStatus = (): boolean => {
  const errorMessage = document.querySelector('.Err');
  if (errorMessage) {
    log(
      `Ставка не принята. Ошибка: "${errorMessage.textContent.trim()}"`,
      'tomato'
    );
    return false;
  }
  const betReference = document.querySelector('.RefNo');
  if (betReference) {
    // Bet Ref 8615863788 - Waiting
    const betReferenceText = betReference.textContent.trim();
    const betReferenceRegex = /^Bet Ref (\d+) - (.*)$/;
    const betReferenceMatch = betReferenceText.match(betReferenceRegex);
    if (!betReferenceMatch) {
      log(
        `Не удалось определить результат ставки из купона: "${betReferenceText}". Считаем ставку непринятой`,
        'tomato'
      );
      return false;
    }
    const betReferenceNumber = betReferenceMatch[1];
    const betResult = betReferenceMatch[2];
    if (betResult === 'Rejected') {
      log(`Ставка не принята (${betResult}) (${betReferenceNumber})`, 'tomato');
      return false;
    }
    if (['Accepted', 'Waiting'].includes(betResult)) {
      log(`Ставка принята (${betResult}) (${betReferenceNumber})`, 'green');
      const bodyData = toFormData({
        bot_api: worker.ApiKey,
        fork_id: worker.ForkId,
        sbobet_bet_id: betReferenceNumber,
      });
      fetch('https://strike.ws/sbobet_bet_ids.php', {
        method: 'POST',
        body: bodyData,
      });
      updateBalance();
      refreshBalance();
      return true;
    }
    log(
      `Неизвестный результат ставки: "${betResult}". Считаем ставку непринятой`,
      'tomato'
    );
    return false;
  }

  log('Не найден результат ставки. Считаем ставку не принятой', 'tomato');
  return false;
};

export default checkStakeStatus;

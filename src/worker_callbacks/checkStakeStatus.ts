import { toFormData } from '@kot-shrodingera-team/config/util';
import { updateBalance, refreshBalance } from '../stake_info/getBalance';

const checkStakeStatus = (): boolean => {
  const errorMessage = document.querySelector('.Err');
  if (errorMessage) {
    worker.Helper.WriteLine(
      `Ставка не принята. Ошибка: "${errorMessage.textContent.trim()}"`
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
      worker.Helper.WriteLine(
        `Не удалось определить результат ставки из купона: "${betReferenceText}"`
      );
      return false;
    }
    const betReferenceNumber = betReferenceMatch[1];
    const betResult = betReferenceMatch[2];
    if (betResult === 'Rejected') {
      worker.Helper.WriteLine(
        `Ставка не принята (${betResult}) (${betReferenceNumber})`
      );
      return false;
    }
    if (['Accepted', 'Waiting'].includes(betResult)) {
      worker.Helper.WriteLine(
        `Ставка принята (${betResult}) (${betReferenceNumber})`
      );
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
    worker.Helper.WriteLine(
      `Неизвестный результат ставки: "${betResult}". Считаем ставку непринятой`
    );
    return false;
  }

  worker.Helper.WriteLine(
    'Не найден результат ставки. Считаем ставку не принятой'
  );
  return false;
};

export default checkStakeStatus;

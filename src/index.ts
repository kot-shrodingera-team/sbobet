import '@kot-shrodingera-team/config/workerCheck';
import { pipeHwlToConsole } from '@kot-shrodingera-team/config/util';
import getStakeInfo from './worker_callbacks/getStakeInfo';
import setStakeSum from './worker_callbacks/setStakeSum';
import doStake from './worker_callbacks/doStake';
import checkCouponLoading from './worker_callbacks/checkCouponLoading';
import checkStakeStatus from './worker_callbacks/checkStakeStatus';
import afterSuccesfulStake from './worker_callbacks/afterSuccesfulStake';
import initialize from './initialization';
import showStake from './show_stake';

pipeHwlToConsole();

worker.SetCallBacks(
  console.log,
  getStakeInfo,
  setStakeSum,
  doStake,
  checkCouponLoading,
  checkStakeStatus,
  afterSuccesfulStake
);

const fastLoad = (): void => {
  const prefix = worker.GetSessionData('SbobetPrefix');
  if (!prefix) {
    worker.Helper.WriteLine(
      'Не найден поддомен. Невозможно сформировать корректный URL'
    );
    worker.JSFail();
    return;
  }
  const url = worker.EventUrl.replace(
    'http://www.sbobet.com',
    // `https://${prefix}.sbobet.com`
    // eslint-disable-next-line prefer-template
    'https://' + prefix + '.sbobet.com'
  );
  worker.Helper.LoadUrl(url);
};

worker.SetFastCallback(fastLoad);

window.alert = (message: string): void => {
  worker.Helper.WriteLine(`Перехваченный алерт: ${message}`);
};

(async (): Promise<void> => {
  worker.Helper.WriteLine('Начали');
  if (!worker.IsShowStake) {
    initialize();
  } else {
    showStake();
  }
})();

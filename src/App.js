import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './View/OutputView.js';
import IssuedLotto from './IssuedLotto.js';
import Lotto from './Lotto.js';
import Bonus from './Bonus.js';
import Computer from './Computer.js';
import Validate from './Validate.js';

class App {
  amount;

  issuedLotto;

  lotto;

  bonus;

  computer;

  earningRate;

  constructor() {
    this.computer = new Computer();
  }

  async getPurchaseAmount() {
    this.amount = await InputView.purchaseAmount();
    try {
      Validate.isItNumber(this.amount);
      Validate.isItUnitOf1000(this.amount);
      this.issuedLotto = new IssuedLotto(this.amount / 1000);
    } catch (err) {
      Console.print(err.message);
      await this.getPurchaseAmount();
    }
  }

  async getSixWinningNumber() {
    let numbers = await InputView.sixWinningNumbers();
    numbers = numbers.split(',');
    try {
      this.lotto = new Lotto(numbers);
    } catch (err) {
      Console.print(err.message);
      await this.getSixWinningNumber();
    }
  }

  async getBonusNumber() {
    const bonusNumber = await InputView.bonusNumber();
    try {
      this.bonus = new Bonus(bonusNumber, this.lotto.getNumbers());
    } catch (err) {
      Console.print(err.message);
      await this.getBonusNumber();
    }
  }

  computeByConditions() {
    this.issuedLotto.getList().forEach((lottos) => {
      const lottoMatch = this.lotto.computeMatchWithLotto(lottos);
      const bonusMatch = this.bonus.computeMatchWithBonus(lottos);
      this.computer.updateState(lottoMatch, bonusMatch);
    });
  }

  computeEarningRate() {
    this.earningRate = this.computer.earningRate(this.amount, this.computer.state);
  }

  showIssuedLottos() {
    const list = this.issuedLotto.getList();
    const count = this.issuedLotto.getCount();
    OutputView.issuedLottosList(list, count);
  }

  showComputeResult() {
    OutputView.computeResult(this.computer.state);
    OutputView.earningRate(this.earningRate);
  }

  async play() {
    await this.getPurchaseAmount();
    this.issuedLotto.createLottos();
    this.showIssuedLottos();
    await this.getSixWinningNumber();
    await this.getBonusNumber();
    this.computeByConditions();
    this.computeEarningRate();
    this.showComputeResult();
  }
}

export default App;

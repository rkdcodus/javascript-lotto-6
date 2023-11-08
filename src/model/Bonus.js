class Bonus {
  #bonus;

  constructor(bonus, numbers) {
    this.#bonus = bonus;
    this.#validate(bonus, numbers);
  }

  #validate(bonus, numbers) {
    if (/[^0-9]/g.test(bonus)) {
      throw new Error('[ERROR] 숫자를 입력해 주세요.');
    } else if (bonus <= 0 || bonus > 45) {
      throw new Error('[ERROR] 1 ~ 45 사이의 숫자여야 합니다.');
    } else if (numbers.includes(bonus)) {
      throw new Error('[ERROR] 보너스 값이 당첨 번호와 중복되선 안됩니다.');
    }
  }

  computeMatchWithBonus(lottos) {
    if (lottos.includes(Number(this.#bonus))) {
      return true;
    }
  }
}

export default Bonus;

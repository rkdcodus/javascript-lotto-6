class Lotto {
  // winning lotto
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    const changeSet = [...new Set(numbers)];
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    } else if (changeSet.length !== numbers.length) {
      throw new Error('[ERROR] 중복된 값이 있습니다.');
    }
    numbers.forEach((number) => {
      if (/[^0-9]/g.test(number)) {
        throw new Error('[ERROR] 숫자를 입력해 주세요.');
      } else if (number <= 0 || number > 45) {
        throw new Error('[ERROR] 1 ~ 45 사이의 숫자여야 합니다.');
      }
    });
  }

  // TODO: 추가 기능 구현
  getNumbers() {
    return this.#numbers;
  }

  computeMatchWithLotto(lottos) {
    let matches = 0;
    this.#numbers.forEach((num) => {
      if (lottos.includes(Number(num))) {
        matches += 1;
      }
    });
    return matches;
  }
}

export default Lotto;

const regexp = require('./regexp.js');

describe('behavior of regexp.toNumber function', () => {
  test('return correct result when parameter is not string', () => {
    let testVal = undefined;
    expect(regexp.toNumber(testVal)).toBeUndefined();

    testVal = 5;
    expect(regexp.toNumber(testVal)).toBe(5);

    testVal = {};
    expect(regexp.toNumber(testVal)).toBeUndefined();

    testVal = ['a'];
    expect(regexp.toNumber(testVal)).toBeUndefined();
  });

  test('return number when parameter string', () => {
    const testVal = '11';
    expect(regexp.toNumber(testVal)).toBe(11);
  });

  test('return first number when parameter string with lettrs', () => {
    const testVal = '2a1';
    expect(regexp.toNumber(testVal)).toBe(2);
  });

  test('return number when string with ,', () => {
    let testVal = '3,6';
    expect(regexp.toNumber(testVal)).toBe(3.6);

    testVal = '6,7,7';
    expect(regexp.toNumber(testVal)).toBe(6.7);
  });

  test('return number when string with .', () => {
    let testVal = '22.8';
    expect(regexp.toNumber(testVal)).toBe(22.8);

    testVal = '9.7.7';
    expect(regexp.toNumber(testVal)).toBe(9.7);
  });

  test('return NaN when not valid string', () => {
    const testVal = 'test';
    expect(regexp.toNumber(testVal)).toBeNaN();
  });
});

describe('behavior of regexp.getTextBetween function', () => {
  describe('check parameters', () => {
    test('return undefined when without parameters', () => {
      expect(regexp.getTextBetween()).toBeUndefined();
    });

    test('return undefined when without first parameters', () => {
      const string = undefined;
      const firstWord = 'some';
      const secondWord = 'behavior';

      expect(regexp.getTextBetween(string, firstWord, secondWord)).toBeUndefined();
    });

    test('return undefined when without passed(valid) parameters', () => {
      const string = 'another long word';
      const firstWord = 'me';
      const secondWord = 'le';

      expect(regexp.getTextBetween(string, firstWord, secondWord)).toBeUndefined();
    });

    test('return undefined when only first parameter valid', () => {
      const string = 'some test behavior';
      const firstWord = undefined;
      const secondWord = undefined;

      expect(regexp.getTextBetween(string, firstWord, secondWord)).toBeUndefined();
    });
  });

  describe('finding middle part of string', () => {
    test('return middle part of string when between two valid words', () => {
      const string = 'some test behavior';
      const firstWord = 'some';
      const secondWord = 'behavior';

      expect(regexp.getTextBetween(string, firstWord, secondWord)).toBe('test');
    });

    test('return middle part of big string when between two valid words', () => {
      const string = 'lorem ipsum tram papam kanban';
      const firstWord = 'ipsum';
      const secondWord = 'papam';

      expect(regexp.getTextBetween(string, firstWord, secondWord)).toBe('tram');
    });

    test('return middle part of big string when there is third parameter', () => {
      const string = 'return middle part of big string with third parameter';
      const firstWord = 'big';
      const secondWord = 'meh';
      const thirdWord = 'with';

      expect(regexp.getTextBetween(string, firstWord, secondWord, thirdWord)).toBe('string');
    });

    test('return middle part of string with third word', () => {
      const string = 'some test behavior';
      const firstWord = 'some';
      const secondWord = 'meh';
      const thirdWord = 'behavior';

      expect(regexp.getTextBetween(string, firstWord, secondWord, thirdWord)).toBe('test');
    });

  });
  describe('returning of tail', () => {
    test('return all tail of string when only with valid firstWord', () => {
      const string = 'return end of string';
      const firstWord = 'of';
      const secondWord = 'meh';
      const thirdWord = 'meh1';

      expect(regexp.getTextBetween(string, firstWord, secondWord, thirdWord)).toBe('string');
    });
  });
});

describe('behavior of regexp.getNumberAfterStr function', () => {
  describe('check parameters', () => {
    test('return undefined when without parameters', () => {
      expect(regexp.getNumberAfterStr()).toBeUndefined();
    });

    test('return number when parameter number', () => {
      const checkungStr = 5;
      expect(regexp.getNumberAfterStr(checkungStr)).toBe(5);
    });
  });

  test('return number when parameter string with number', () => {
    const checkungStr = 'games: 12';
    const partialStr = 'games:';

    expect(regexp.getNumberAfterStr(checkungStr, partialStr)).toBe(12);
  });

  test('return number when number with ,', () => {
    const checkungStr = 'height: 17,2';
    const partialStr = 'height:';

    expect(regexp.getNumberAfterStr(checkungStr, partialStr)).toBe(17.2);
  });

  test('return number when number with .', () => {
    const checkungStr = 'Value price: 5.43';
    const partialStr = 'price:';

    expect(regexp.getNumberAfterStr(checkungStr, partialStr)).toBe(5.43);
  });

  test('return number when in the middle of the string', () => {
    const checkungStr = 'real age 90 month';
    const partialStr = 'age';

    expect(regexp.getNumberAfterStr(checkungStr, partialStr)).toBe(90);
  });
});

describe('behavior of regexp.stringPriceToNumber function', () => {
  describe('behavior with invalid parameters', () => {
    test('return correct result when parameter is not string', () => {
      let testVal = undefined;
      expect(regexp.stringPriceToNumber(testVal)).toBeUndefined();

      testVal = 5;
      expect(regexp.stringPriceToNumber(testVal)).toBe(5);

      testVal = {};
      expect(regexp.stringPriceToNumber(testVal)).toBeUndefined();

      testVal = ['a'];
      expect(regexp.stringPriceToNumber(testVal)).toBeUndefined();
    });

    test('return only number when string without shourtcut', () => {
      let testVal = 'His price 782 $';
      expect(regexp.stringPriceToNumber(testVal)).toBe(782);
    });

    test('return undefined when string without number', () => {
      let testVal = 'His price $';
      expect(regexp.stringPriceToNumber(testVal)).toBeUndefined();
    });
  });

  describe('behavior with shourtcuts', () => {
    test('return correct number when shourtcut with Тыс', () => {
      let testVal = '453 Тыс $';
      expect(regexp.stringPriceToNumber(testVal)).toBe(453000);
    });

    test('return correct number when shourtcut with Млн', () => {
      let testVal = '13,5 Млн $';
      expect(regexp.stringPriceToNumber(testVal)).toBe(13500000);
    });

    test('return correct number when shourtcut with Млрд', () => {
      let testVal = 'There 5.9 Млрд.';
      expect(regexp.stringPriceToNumber(testVal)).toBe(5900000000);
    });
  });
  describe('behavior when shourtcuts part of another word', () => {
    test('ignore Тыс when it is not after number', () => {
      let testVal = 'Тысча чертей 11 Млн $';
      expect(regexp.stringPriceToNumber(testVal)).toBe(11000000);
    });

    test('ignore Млн when it is not after number', () => {
      let testVal = 'Млнmmp 7 Млрд $';
      expect(regexp.stringPriceToNumber(testVal)).toBe(7000000000);
    });

    test('ignore Млрд when it is not after number', () => {
      let testVal = 'Almost 20 Тыс. длМлрд.';
      expect(regexp.stringPriceToNumber(testVal)).toBe(20000);
    });
  });

  describe('behavior when few numbers in string', () => {
    test('only first when there is few', () => {
      let testVal = '10 Тыс.monstrs in 46 Тыс. длМлрд.';
      expect(regexp.stringPriceToNumber(testVal)).toBe(10000);
    });

    test('correct value when there is few numbers', () => {
      let testVal = '101 monstrs in 78,9 МлнТыс. длМлрд. 37,3';
      expect(regexp.stringPriceToNumber(testVal)).toBe(78900000);
    });
  });
});

describe('behavior of regexp.stringDateToTime function', () => {
  test('return correct result when parameter is not string', () => {
    let testVal = undefined;
    expect(regexp.stringDateToTime(testVal)).toBeUndefined();

    testVal = 5;
    expect(regexp.stringDateToTime(testVal)).toBeUndefined();

    testVal = {};
    expect(regexp.stringDateToTime(testVal)).toBeUndefined();

    testVal = ['a'];
    expect(regexp.stringDateToTime(testVal)).toBeUndefined();
  });
  describe('behavior of parameter format: DD month YYYY', () => {
    test('return time when string with russian month', () => {
      let testVal = '09 июня 2010 г.';
      expect(regexp.stringDateToTime(testVal)).toBe(1276030800000);
    });
  });

  describe('behavior of parameter format: DD.MM.YYYY', () => {
    test('return time when parameter valid string', () => {
      let testVal = '01.02.1988';
      expect(regexp.stringDateToTime(testVal)).toBe(570661200000);
    });

    test('return time when in parameter extra dots', () => {
      let testVal = '15.12.1088.67.144';
      expect(regexp.stringDateToTime(testVal)).toBe(-27803095324000);
    });
  });
});

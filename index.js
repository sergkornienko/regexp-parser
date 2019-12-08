const MONTHS = [
  {
    eng: 'Jan',
    rus: 'янв',
  },
  {
    eng: 'Feb',
    rus: 'февр',
  },
  {
    eng: 'Mar',
    rus: 'марта',
  },
  {
    eng: 'Apr',
    rus: 'апр',
  },
  {
    eng: 'May',
    rus: 'мая',
  },
  {
    eng: 'Jun',
    rus: 'июня',
  },
  {
    eng: 'Jul',
    rus: 'июля',
  },
  {
    eng: 'Aug',
    rus: 'авг',
  }, 
  {
    eng: 'Sept',
    rus: 'сент',
  },
  {
    eng: 'Oct',
    rus: 'окт',
  }, {
    eng: 'Nov',
    rus: 'нояб',
  },
  {
    eng: 'Dec',
    rus: 'дек',
  },
];

/**
 * Find number in the string and returns it
 *
 * @param {string} str Text in which should be founded number
 * @returns {number|undefined}
 */
const toNumber = (str) => {
  if (typeof str === 'number') {
    return str;
  }
  if (typeof str !== 'string') {
    return undefined;
  }

  const [newNum] = str.replace(/\,/g, '.').match(/(\d+(\.)\d+)|\d+/g) || [];
  return Number(newNum);
};

/**
 * Find middle part of the string between 1 & 2 breakpoints
 * in case if second breakpoint don't exist find between 1 & 3 
 * 
 * @param {string} allText String in whish searched middle part
 * @param {string} firstText First text breakpoint
 * @param {string} secondText Second breakpoint
 * @param {string} thirdText Third breakpoint
 * @returns {string|undefined}
 */
const getTextBetween = (allText, firstText, secondText, thirdText) => {
  if (!allText) {
    return;
  }
  let endText = allText.includes(secondText) ? secondText : thirdText;
  let draftText = allText
    .split(firstText)[1];

  if (!draftText) {
    return draftText;
  }
  [draftText] = draftText.replace(/\s+/g, ' ').split(endText);

  return draftText.trim();
};

/**
 * Find number after text breakpoint
 *
 * @param {string} allText Text in which should be founded number
 * @param {string} word Text breakpoint
 * @returns {number|undefined}
 */
const getNumberAfterStr = (allText, word) => {
  if (!allText) {
    return;
  }
  if (typeof allText === 'number') {
    return allText;
  }

  const num = '(\\d+(\\.|\\,)\\d+)|\\d+';
  const numReg = new RegExp(num, 'gm');
  const regExp = new RegExp(word + '(\\s*(' + num + '))', 'gm');

  let [number] = (allText.match(regExp) || [''])[0].match(numReg) || [];
  number = toNumber(number);

  return number;
};

/**
 * Convert price from formats: 
 *    <number Тыс $>
 *    <number Млн $>
 *    <number Млрд $>
 * to normal number
 * 
 * @param {string} str String with price
 * @returns {number|undefined}
 */
const stringPriceToNumber = (str) => {
  if (typeof str === 'number') {
    return str;
  }
  if (typeof str !== 'string') {
    return;
  }

  /**
   * Left only first expression number+Shourtcut everything else remove
   * exp. Млн МлнМлн 1.6 Тыс ТысТысТысТыс -> 1.6 Тыс 
   */
  const [priceExpr] = str.match(/((\d+(\.|\,)\d+)|\d+)\s+(Млн|Тыс|Млрд)/gm) || [];

  if (!priceExpr) {
    return toNumber(str) || undefined;
  }

  const shourtcuts = [
    {
      name: ' Тыс',
      val: 1000,
    },
    {
      name: ' Млн',
      val: 1000000,
    },
    {
      name: ' Млрд',
      val: 1000000000,
    },
  ];

  let price = toNumber(priceExpr);

  shourtcuts.forEach((shrt) => {
    if (priceExpr.includes(shrt.name)) {
      price = toNumber(priceExpr) * shrt.val;
    }
  });

  return price;
};

/**
 * Convert date string from formats
 *    DD.MM.YYYY
 *    DD-MM-YYYY
 *    DD month YYYY (russian)
 * to Date.getTime() format
 * 
 * @param {string} strDate
 * @returns {number|undefined}
 */
const stringDateToTime = (strDate) => {
  if (typeof strDate !== 'string') {
    return;
  }

  const [wordFormat] = strDate.match(/\d{2}\s([а-яА-Я]*)(\s|.\s)\d{4}/gm) || [false];
  const [dotFormat] = strDate.match(/\d{2}\.\d{2}\.\d{4}/gm) || [false];
  const [lineFormat] = strDate.match(/\d{2}\-\d{2}\-\d{4}/gm) || [false];

  if (wordFormat) {
    const [month] = MONTHS.filter((e) => e.rus === wordFormat.match(/[а-яА-Я]+/gm)[0]);
    const strDateNew = wordFormat.replace('.', '').replace(month.rus, month.eng);

    return (new Date(strDateNew)).getTime();
  } else if (dotFormat) {
    const month = MONTHS[toNumber(dotFormat.match(/\.\d{2}\./gm)[0].replace('.', '')) - 1];
    const strDateNew = dotFormat.replace(/\.\d{2}\./gm, ` ${month.eng} `);

    return (new Date(strDateNew)).getTime();
  } else if (lineFormat) {
    const month = MONTHS[toNumber(lineFormat.match(/\-\d{2}\-/gm)[0].replace('-', '')) - 1];
    const strDateNew = lineFormat.replace(/\-\d{2}\-/gm, ` ${month.eng} `);

    return (new Date(strDateNew)).getTime();
  } 
};

/**
 * @typedef {Object} TextNum
 * @property {string} text
 * @property {number} num
 */

/**
 * Find all pairs of (string and numbers) and (number and strings)
 * depends on what is first
 * Example: 
 *    Sehic6.64.Kvrzic6.43. => [
 *      {
 *        str: 'Sehic', 
 *        num: '6.64'
 *      },
 *      {
 *        str: 'Kvrzic', 
 *        num: '6.43'
 *      },
 *    ]
 *
 * @param {string} str
 * @returns {Array<TextNum>|undefined}
 */
const numStrToArray = (str) => {
  if (typeof str === 'number') {
    return [{ num: str, text: undefined }];
  } else if (!str || typeof str !== 'string') {
    return;
  }

  const [firstCharacter] = str;
  const isFirstStr = isNaN(Number(firstCharacter));
  const numStrReg = '((\\d+(\\.|\\,)\\d+)|\\d+)((.|\\s)[a-zA-Z]+)';
  const strNumReg = '([a-zA-Z ]+)((\\d+(\\.|\\,)\\d+)|\\d+)';
  const reg = isFirstStr ? strNumReg : numStrReg;
  const regExp = new RegExp(reg, 'gm');
  const results = str.match(regExp);

  if (!results) {
    const num = toNumber(str) || undefined;
    const text = str
      .replace(String(num), '')
      .replace(/\d/gm, '')
      .trim()
      || undefined;

    return [{ num, text }];
  }

  return results.map((res) => {
    const num = toNumber(res);
    const text = res.replace(/[^a-zA-Z]/gm, '');

    return { num, text };
  });
};

module.exports = {
  toNumber,
  getTextBetween,
  getNumberAfterStr,
  stringPriceToNumber,
  stringDateToTime,
  numStrToArray,
};

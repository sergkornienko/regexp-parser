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

const stringDateToTime = (strDate) => {
  if (typeof strDate !== 'string') {
    return;
  }

  const [wordFormat] = strDate.match(/\d{2}\s([а-яА-Я]*)(\s|.\s)\d{4}/gm) || [false];
  const [dotFormat] = strDate.match(/\d{2}\.\d{2}\.\d{4}/gm) || [false];


  if (wordFormat) {
    const [month] = MONTHS.filter((e) => e.rus === wordFormat.match(/[а-яА-Я]+/gm)[0]);
    const strDateNew = wordFormat.replace('.', '').replace(month.rus, month.eng);

    return (new Date(strDateNew)).getTime();
  } else if (dotFormat) {
    const month = MONTHS[toNumber(dotFormat.match(/\.\d{2}\./gm)[0].replace('.', '')) - 1];
    const strDateNew = dotFormat.replace(/\.\d{2}\./gm, ` ${month.eng} `);

    return (new Date(strDateNew)).getTime();
  }
};

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

const strToDate = (str) => {
  if (!str || typeof str !== 'string' || !str.match(/\d{2}-\d{2}-\d{4}/gm)) {
    return;
  }

  const [date, month] = str.match(/\d{2}/gm);
  const [year] = str.match(/\d{4}/gm);

  return (date && month && year) 
    ? new Date(year, month - 1, date) 
    : undefined;
}

module.exports = {
  toNumber,
  getTextBetween,
  getNumberAfterStr,
  stringPriceToNumber,
  stringDateToTime,
  numStrToArray,
  strToDate,
};

# Service helper which parse different patterns of string
## Installation
``` npm i serhiiko-regexp-parser```
## Usage
Import npm module  
```const regexp = require('serhiiko-regexp-parser');```
## Functions
1. regexp.toNumber(str)
```
/**
 * Find number in the string and returns it
 *
 * @param {string} str Text in which should be founded number
 * @returns {number|undefined}
 */
 ```
 2. regexp.getTextBetween(allText, firstText, secondText, thirdText)
```
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
 ```
 3. regexp.getNumberAfterStr(allText, word)
```
/**
 * Find number after text breakpoint
 *
 * @param {string} allText Text in which should be founded number
 * @param {string} word Text breakpoint
 * @returns {number|undefined}
 */
 ```
 4. regexp.stringPriceToNumber(str)
```
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
 ```
  5. regexp.stringDateToTime(strDate)
```
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
 ```
  6. regexp.numStrToArray(str)
```
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
 /**
 * @typedef {Object} TextNum
 * @property {string} text
 * @property {number} num
 */
 ```
 
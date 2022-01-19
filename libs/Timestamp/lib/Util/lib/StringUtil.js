export default class StringUtil {
  /**
   * @method findNaNinString
   * - Finds all characters in a string that does not represent a number
   *
   * @param { string } str - Any string of any length
   *
   * @returns { Array } An array of all the characters that do not represent a number in the given string
   */

  findNaNinString(str = this.date) {
    if (typeof str !== 'string') {
      throw new Error(`str must be of type string
        `);
    }
    let chars = [];

    // Looks through all characters in the string and pushes the character that is not a number the the chars array
    for (let char of str) {
      if (isNaN(char)) {
        chars = [...chars, char];
      }
    }
    return chars;
  }

  /**
   * @method findNumbersInString
   * - Finds all characters that represent a number in a string
   *
   * @param { string } str - Any string of any length
   *
   * @returns { Array } An array of all the characters that represent a number in the given string
   */

  findNumbersInString(str = this.date) {
    if (typeof str !== 'string') {
      throw new Error(`str must be of type string
        `);
    }

    // Iterates through an array of characters that do not represent a number found in the given string.
    // On each iteration the none number character in the string is replaced with a " - "
    for (let char of this.findNaNinString(str)) {
      str = str.split(char).join('-');
    }

    // Finaly the string is then split at the " - " to return an array of strings respresenting numbers
    return str.split('-');
  }

  getFirstSetOfChars(str, qty) {
    let chars = [];
    for (let char of str) {
      if (str.indexOf(char) === qty) {
        break;
      }
      chars.push(char);
    }
    return chars.join('');
  }

  prependCharToString(str, char) {
    str = str.split('');
    str = [char, ...str];
    return str.join('');
  }

  appendCharToString(str, char) {
    str = str.split('');
    str = [...str, char];
    return str.join('');
  }
}

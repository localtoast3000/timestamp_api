export default class NumberUtil {
  shiftZeroToNumber(number, maxLimit) {
    let numString = String(Number(number));
    while (numString.length < maxLimit) {
      numString = `0${numString}`;
    }
    return numString;
  }
}

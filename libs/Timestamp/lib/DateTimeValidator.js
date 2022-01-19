import { str, num } from './Util/Util.js';

export default class DateTimeValidator {
  constructor({ numericDate, dateFormat, time }) {
    this.date = numericDate;
    this.dateFormat = dateFormat;
    this.time = time;
  }

  isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  validateDateString(date = this.date, numericDateFormat = this.dateFormat) {
    const seporator = this.findAndValidateSeparator(date);
    const dateArr = date.split(seporator);
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day, month, year;

    if (numericDateFormat === 'DMY') {
      day = dateArr[0];
      month = dateArr[1];
      year = dateArr[2];
    }
    if (numericDateFormat === 'MDY') {
      day = dateArr[1];
      month = dateArr[0];
      year = dateArr[2];
    }
    if (numericDateFormat === 'YMD') {
      day = dateArr[2];
      month = dateArr[1];
      year = dateArr[0];
    }

    day = Number(day);
    month = Number(month);
    year = Number(year);

    if (year <= 0) {
      throw new Error(`Invalid year
          `);
    }
    if (this.isLeapYear(year)) {
      daysInMonth[1] = 29;
    }
    if (daysInMonth[month - 1] === undefined || month <= 0) {
      console.log(month);
      throw new Error(`Invalid month
          `);
    }
    if (day > daysInMonth[month - 1] || day <= 0) {
      throw new Error(`Invalid day number
          `);
    }
    return dateArr.join(seporator);
  }

  validateTimeString(time = this.time) {
    if (Number(time) === 0) {
      return '00:00:00:000';
    }
    time = time.split(':');
    for (let element of time) {
      if (time.indexOf(element) === 3) {
        if (Number(element) > 999 || Number(element) < 0) {
          throw new Error(`Invalid time element milliseconds must be a number from 0 to 999
              `);
        }
        break;
      }
      if (Number(element) > 59 || Number(element) < 0) {
        throw new Error(`Invalid time elements hours, minutes, seconds must be a number from 0 to 59
            `);
      }
    }
    return time.join(':');
  }

  findAndValidateSeparator(date = this.date) {
    let separators = str.findNaNinString(date);
    if (separators.length !== 2 || separators[0] !== separators[1]) {
      throw new Error('Invalid date separators');
    }
    return separators[0];
  }
}

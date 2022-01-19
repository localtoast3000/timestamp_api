import { str, num } from './lib/Util/Util.js';
import DateTimeValidator from './lib/DateTimeValidator.js';

export default class Timestamp extends DateTimeValidator {
  constructor({ numericDate, dateFormat, time }) {
    super({ numericDate, dateFormat, time });
    this.instance;
    this.date;
    this.dateFormat;
    this.time;
    this.setDateTime(numericDate, dateFormat, time);
  }

  setDateTime(numericDate, dateFormat, time) {
    const { date, format, separator } = this.formatNumericDate(numericDate, dateFormat);
    if (time === undefined) {
      time = this.formatTime('0');
    } else {
      time = this.formatTime(time);
    }

    const dateArr = date.split(separator).map((x) => Number(x));
    const timeArr = time.split(':').map((x) => Number(x));

    if (format === 'YMD') {
      this.instance = new Date(Date.UTC(dateArr[0], dateArr[1] - 1, dateArr[2], ...timeArr));
    }
    if (format === 'DMY') {
      this.instance = new Date(Date.UTC(dateArr[2], dateArr[1] - 1, dateArr[0], ...timeArr));
    }
    if (format === 'MDY') {
      this.instance = new Date(Date.UTC(dateArr[2], dateArr[0] - 1, dateArr[1], ...timeArr));
    }

    this.date = date;
    this.dateFormat = format;
    this.time = time;
  }

  getWeekDay(format = 'short') {
    const shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const longWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (!this.instance instanceof Date) {
      throw new Error('A date has not been instantiated, cannot calculate weekday');
    }

    if (format === 'short') {
      return shortWeekDays[this.instance.getDay()];
    } else if (format === 'long') {
      return longWeekDays[this.instance.getDay()];
    } else if (format === 'index') {
      return this.instance.getDay();
    } else {
      throw new Error('Incorrect weekday type given');
    }
  }

  getNumericDateSeporator(date) {
    if (date === undefined) {
      throw new Error('Date is undefined');
    }
    return this.findAndValidateSeparator(date);
  }

  getISOdateFormat() {
    let d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  getDateElement(element, format = 'numeric') {
    const longMonths = [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let result = null;

    if (element === undefined) {
      throw new Error('A date element has not been specified');
    }
    if (!this.instance instanceof Date) {
      throw new Error('A date has not been instantiated, cannot calculate date element');
    }
    if (element === 'day') {
      const day = this.instance.getDate();
      result = format === 'numeric' ? day : format === 'string' ? num.shiftZeroToNumber(day, 2) : null;
    }
    if (element === 'month') {
      const month = this.instance.getMonth();
      result =
        format === 'index'
          ? month
          : format === 'numeric'
          ? month + 1
          : format === 'string'
          ? num.shiftZeroToNumber(month + 1, 2)
          : format === 'short'
          ? shortMonths[month]
          : format === 'long'
          ? longMonths[month]
          : null;
    }
    if (element === 'year') {
      const year = this.instance.getFullYear();
      result = format === 'numeric' ? year : format === 'string' ? String(year) : null;
    }

    return result !== null ? result : console.error('Error: Invalid or NO format defined for date element');
  }

  formatNumericDate(date, inFormat, outFormat = undefined) {
    let dateObject = { date: null, format: null, separator: null };

    if (date === undefined) {
      date = this.getISOdateFormat();
      inFormat = 'YMD';
    } else if (typeof date !== 'string') {
      throw new Error(`date must be of type string
      `);
    }
    if (inFormat === undefined) {
      throw new Error(`An in format must be defined for succesful date sorting
      `);
    }
    if (outFormat === undefined) {
      outFormat = inFormat;
    }

    // Split date string up at the separators
    dateObject.separator = this.getNumericDateSeporator(date);
    let dateArray = this.validateDateString(date, inFormat).split(dateObject.separator);
    let sortedDate = [];

    if (dateArray.length !== 3) {
      throw new Error(`Invalid date
      `);
    }

    if (inFormat === 'DMY') {
      if (outFormat === 'YMD') {
        sortedDate[0] = dateArray[2];
        sortedDate[1] = dateArray[1];
        sortedDate[2] = dateArray[0];
      }
      if (outFormat === 'MDY') {
        sortedDate[0] = dateArray[1];
        sortedDate[1] = dateArray[0];
        sortedDate[2] = dateArray[2];
      }
    }
    if (inFormat === 'MDY') {
      if (outFormat === 'DMY') {
        sortedDate[0] = dateArray[1];
        sortedDate[1] = dateArray[0];
        sortedDate[2] = dateArray[2];
      }
      if (outFormat === 'YMD') {
        sortedDate[0] = dateArray[2];
        sortedDate[1] = dateArray[0];
        sortedDate[2] = dateArray[1];
      }
    }
    if (inFormat === 'YMD') {
      if (outFormat === 'DMY') {
        sortedDate[0] = dateArray[2];
        sortedDate[1] = dateArray[1];
        sortedDate[2] = dateArray[0];
      }
      if (outFormat === 'MDY') {
        sortedDate[0] = dateArray[1];
        sortedDate[1] = dateArray[2];
        sortedDate[2] = dateArray[0];
      }
    }

    // After the sorted date array has all of the date elements in the correct positions, the function
    // returns sorted date as a string with the date elements seporated by thedesired seporator

    dateObject.date = dateArray.map((x) => num.shiftZeroToNumber(x, 2)).join(dateObject.separator);
    dateObject.format = outFormat;
    return dateObject;
  }

  formatTime(time) {
    if (typeof time !== 'string') {
      throw new Error(`time must be of type string
      `);
    }
    if (time.split('').includes(':')) {
      let splitTime = time.split(':');
      if (splitTime.length > 4) {
        throw new Error(`time string is too large
        `);
      }
      if (str.findNaNinString(splitTime.join('')).length > 0) {
        throw new Error(`Invalid time 
        `);
      }
    } else if (time.length < 3) {
      time = this.validateTimeString(time);
    } else {
      throw new Error(`time elements must be seporated by " : "
      `);
    }
    time = this.validateTimeString(time);
    time = time.split(':');

    for (let i = time.length; i < 4; i++) {
      if (i === 3 && time[i] === undefined) {
        time.push('000');
        break;
      }
      time.push('00');
    }

    return time
      .map((x) => {
        if (time.indexOf(x) === 3) {
          return num.shiftZeroToNumber(x, 3);
        }
        return num.shiftZeroToNumber(x, 2);
      })
      .join(':');
  }

  getUTCoffset() {}
}

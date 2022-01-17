/**
 * A timestamp Class
 */

export default class Timestamp {
  /**
   *
   * @param { object } obj - Pass in a blank object to have all propertys set to current date and time
   * @param { string } obj.date - Date string of any date format and seperator type
   * @param { string } obj.dateFormat -
   *    Defines the format of the date set on the object parameter.
   *    Accepts string values of:
   
   **     "DMY" = Day Month Year
   **     "MDY" = Month Day Year
   **     "YMD" = Year Month Day

   * @param { string }  obj.time - Time in formats
   - h : m : s : ms
   -
   - leave time element out to have it set to zero
   ** h : m : s
   ** h : m
   ** h
   -
   ** Set as undefined for time to be set to current time
   */

  constructor({ date, dateFormat, time }) {
    this.date = date === undefined ? this.getCurrentDate() : this.sortDateString(date, dateFormat, dateFormat);
    this.dateFormat = dateFormat === undefined ? 'YMD' : dateFormat;
    this.dateSeparator = date === undefined ? '-' : this.findAndValidateSeporator(date);
    this.time = time === undefined ? this.getCurrentTime() : this.sortTimeString(time);
    this.stamp = this.getLocalTimestamp();
  }

  /**
   * @method getCurrentDate - The current date today
   * @returns { string } Todays date in the format of YYYY-MM-DD
   */

  getCurrentDate() {
    const d = new Date();
    const todaysDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    return this.sortDateString(todaysDate, 'YMD', 'YMD');
  }

  /**
   * @method getCurrentTime - The current time
   * @returns { string } The current time in the format of h:m:s:ms
   */

  getCurrentTime() {
    const t = new Date();
    const timeNow = `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}:${t.getMilliseconds()}`;
    return this.sortTimeString(timeNow);
  }

  /**
   * @method getLocalTimestamp - Timestamp of local timezone
   *
   * @param { string } date - Date string of any date format and separator type
   */

  getLocalTimestamp() {
    const dateArr = this.date.split(this.dateSeparator);
    const timeArr = this.time.split(':');
    dateArr[1] = dateArr[1] - 1;
    return new Date(...dateArr, ...timeArr).toString();
  }

  /**
   * @param { object } obj
   * @param { string } obj.lang - Language abbreviation, eg English = "en"
   * @param { string } obj.country - Country code, eg Great Britain = "GB"
   * @param { string } obj.timezone - Time zone area eg Great Britain = "Europe/London"
   *
   * @returns { string }
   *
   * Date and time equivalent of the constructors date and time in requested timezone.
   *
   * Time is set to the 24 hour clock.
   */

  getForeignTimestamp({ lang, country, timezone }) {
    const dateArr = this.date.split(this.dateSeparator);
    const timeArr = this.time.split(':');
    return new Date(...dateArr, ...timeArr).toLocaleString(`${lang}-${country}`, {
      timeZone: timezone,
      hour12: false,
    });
  }

  isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  validateDateString(date = this.date, dateFormat = this.dateFormat) {
    const seporator = this.findAndValidateSeporator(date);
    const dateArr = date.split(seporator);
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day, month, year;

    if (dateFormat === 'DMY') {
      day = dateArr[0];
      month = dateArr[1];
      year = dateArr[2];
    }
    if (dateFormat === 'MDY') {
      day = dateArr[1];
      month = dateArr[0];
      year = dateArr[2];
    }
    if (dateFormat === 'YMD') {
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
      throw new Error(`Invalid month
      `);
    }
    if (day > daysInMonth[month - 1] || day <= 0) {
      throw new Error(`Invalid day number
      `);
    }
    return dateArr.join(seporator);
  }

  /**
   * @method sortDateString - Formats a string representing a date to the ISO date format YYYY-MM-DD
   *
   * @param { string } date - Date string of any date format and separator type
   * @param { string } dateFormat -
   *    Defines the format of the date passed in to the method.
   *    Accepts string values of:
   *
   **     "DMY" = Day Month Year
   **     "MDY" = Month Day Year
   **     "YMD" = Year Month Day
   *
   * @returns { string } date string in format YYYY-MM-DD
   */

  sortDateString(date = this.date, inFormat, outFormat) {
    if (typeof date !== 'string') {
      throw new Error(`date must be of type string
      `);
    }
    if (inFormat === undefined) {
      throw new Error(`An in format must be defined for succesful date sorting
      `);
    }
    if (outFormat === undefined) {
      throw new Error(`An out format ( return format ) must be specified
      `);
    }

    // Split date string up at the separators
    let separator = this.findAndValidateSeporator(date);
    let dateArray = this.validateDateString(date, inFormat).split(separator);
    let sortedDate = [];

    if (dateArray.length !== 3) {
      throw new Error(`Invalid date
      `);
    }

    if (inFormat === 'DMY') {
      if (outFormat === 'DMY') {
        return dateArray.map((x) => this.shiftZeroToNumber(x, 2)).join(separator);
      }
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
      if (outFormat === 'MDY') {
        return dateArray.map((x) => this.shiftZeroToNumber(x, 2)).join(separator);
      }
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
      if (outFormat === 'YMD') {
        return dateArray.map((x) => this.shiftZeroToNumber(x, 2)).join(separator);
      }
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
    return sortedDate.map((x) => this.shiftZeroToNumber(x, 2)).join(separator);
  }

  /**
   *  @method sortTimeString - Checks if time string is in correct format and checks the time elements are within there limits
   *
   * @param { string } time - Time in formats
   - h : m : s : ms
   -
   - leave time element out to define it as zero
   ** h : m : s
   ** h : m
   ** h :
   *
   * @returns { string } - If valid returns the time string passed into the method formated to h : m : s : ms else throws an error
   */

  sortTimeString(time = this.time) {
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
      if (this.findNaNinString(splitTime.join('')).length > 0) {
        throw new Error(`Invalid time 
        `);
      }
    } else if (time.length < 3) {
      return this.validateTimeString(time);
    } else {
      throw new Error(`time elements must be seporated by " : "
      `);
    }

    time = time.split(':').map((x) => this.shiftZeroToNumber(x, 2));
    time = this.validateTimeString(time);

    return time.join(':');
  }

  validateTimeString(time = this.time) {
    for (let element of time) {
      if (time.indexOf(element) === 3) {
        if (Number(element) > 999 || Number(element) < 0) {
          throw new Error(`Invalid time element milliseconds must be a number from 0 to 999
          `);
        }
        time[time.indexOf(element)] = this.shiftZeroToNumber(element, 3);
        break;
      }
      if (Number(element) > 59 || Number(element) < 0) {
        throw new Error(`Invalid time elements hours, minutes, seconds must be a number from 0 to 59
        `);
      }
      time[time.indexOf(element)] = this.shiftZeroToNumber(element, 2);
    }
    return time;
  }

  findAndValidateSeporator(date = this.date) {
    let separators = this.findNaNinString(date);
    if (separators.length !== 2 || separators[0] !== separators[1]) {
      throw new Error('Invalid date separators');
    }
    return separators[0];
  }

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

  shiftZeroToNumber(number, maxLimit) {
    while (String(number).length < maxLimit) {
      number = `0${String(number)}`;
    }
    return number;
  }
}

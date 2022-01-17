// Months object with month code for refrencing when building calendar dates
const months = [
  { name: 'January', shortName: 'Jan', pos: 1, days: 31, code: 0 },
  { name: 'February', shortName: 'Feb', pos: 2, days: 28, code: 3 },
  { name: 'March', shortName: 'Mar', pos: 3, days: 31, code: 3 },
  { name: 'April', shortName: 'Apr', pos: 4, days: 30, code: 6 },
  { name: 'May', shortName: 'May', pos: 5, days: 31, code: 1 },
  { name: 'June', shortName: 'Jun', pos: 6, days: 30, code: 4 },
  { name: 'July', shortName: 'Jul', pos: 7, days: 31, code: 6 },
  { name: 'August', shortName: 'Aug', pos: 8, days: 31, code: 2 },
  { name: 'September', shortName: 'Sep', pos: 9, days: 30, code: 5 },
  { name: 'October', shortName: 'Oct', pos: 10, days: 31, code: 0 },
  { name: 'November', shortName: 'Nov', pos: 11, days: 30, code: 3 },
  { name: 'December', shortName: 'Dec', pos: 12, days: 31, code: 5 },
];

// Weekdays object with day number code in zero indexing form for refrencing when building calendar dates
const weekDays = [
  { name: 'Sunday', code: 0 },
  { name: 'Monday', code: 1 },
  { name: 'Tuesday', code: 2 },
  { name: 'Wednesday', code: 3 },
  { name: 'Thursday', code: 4 },
  { name: 'Friday', code: 5 },
  { name: 'Saturday', code: 6 },
];

// Calendar date class with methods to create and manipulate calanders and dates
export default class CalenderDates {
  constructor(date) {
    this.calDate = date;
  }

  // Takes in a year as a string or number and splits it into an array of [number, suffix] if suffix excists
  // and in the formats BC, CE or BCE.
  // If not an Error will be raised
  splitYearSuffix(fullYear) {
    let year = String(fullYear).split('');
    let suffix = [year[year.length - 3], year[year.length - 2], year[year.length - 1]].join('');
    if (suffix !== 'BCE') {
      suffix = suffix.split('');
      suffix.shift();
      suffix = suffix.join('');
    }
    if (suffix === 'BC' || suffix === 'CE' || suffix === 'BCE') {
      let splitSuffix = [Number(String(year.join('')).split(suffix)[0]), suffix];
      if (splitSuffix[0] === NaN) {
        throw new Error(`Invalid ${suffix} year, must only contain a number or a string of numbers then ${suffix}`);
      }
      let joinedSuffix = String(splitSuffix[0])
        .split('')
        .map((x) => Number(x))
        .concat(splitSuffix[1]);

      return joinedSuffix;
    } else {
      throw new Error('Invalid year suffix');
    }
  }

  // Takes in a year as a string or number and splits it into an array of [prefix, number] if prefix excists
  // and in the format AD.
  // If not an Error will be raised
  splitPrefixYear(fullYear) {
    let year = String(fullYear).split('');
    let prefix = [year[0], year[1]].join('');

    if (prefix === 'AD') {
      let splitPrefix = [prefix, Number(String(year.join('')).split(prefix)[1])];
      if (splitPrefix[1] === NaN) {
        throw new Error(`Invalid ${prefix} year, must only contain ${prefix} then a number or a string of numbers`);
      }

      let prefixJoinedYear = [splitPrefix[0]].concat(
        String(splitPrefix[1])
          .split('')
          .map((x) => Number(x))
      );

      return prefixJoinedYear;
    } else {
      throw new Error('Invalid prefix year');
    }
  }

  // Checks if a given year has a suffix of BC, BCE or CE
  hasSuffix(fullyear) {
    try {
      this.splitYearSuffix(fullyear);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Checks if a given year has a prefix of AD
  hasPrefix(fullyear) {
    try {
      this.splitPrefixYear(fullyear);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Takes in a year as a string or number and validates it, then returns a
  // split version of that year with each digit at a seperate index but with prefix or suffix
  // as a single string at it's own index in the array.
  validateAndSplitYear(fullYear) {
    let year = String(fullYear).split('');

    if (year.length === 0) {
      throw new Error('Nothing passed in');
    }

    try {
      year = this.splitYearSuffix(year.join(''));
    } catch {
      try {
        year = this.splitPrefixYear(year.join(''));
      } catch {
        year = year.map((x) => Number(x));
        if (year.includes(NaN)) {
          throw new Error('Year invalid, must only contain numbers or a string of numbers');
        }
      }
    }
    return year;
  }

  // Takes in a month in formats January, Jan or 1 then validates it against the months object.
  // If validation fails an Error will be raised.
  // If passed then the short name of the month will be returned unless the returnNumber argument is true
  // then the number representing the month will be returned
  validateMonth(month, returnNumber = false) {
    month = String(month);
    if (month.length > 2) {
      for (let m of months) {
        if (month === m.name || month === m.shortName) {
          month = m.pos;
          if (!returnNumber) {
            return m.shortName;
          }
        }
      }
      if (typeof month !== 'number') {
        throw new Error('Invalid month given');
      }
    }

    return Number(month);
  }

  // A number representing a day of the month will be validated against the max argument passed in
  // to see if the day number is within range
  // If not an Error will be thrown
  // max is defaulted at 31
  validateDay(day, max = 31) {
    day = Number(day);

    if (day === NaN) {
      throw new Error('Day invalid, must only contain numbers or a string of numbers');
    }

    if (day > max || day < 1) {
      throw new RangeError('Invalid day number');
    }

    return day;
  }

  // Takes a date string in formats:
  //                                  DD/MM/YYYY
  //                                  DD-MM-YYYY
  //                                  DD.MM.YYYY
  // splits the date at the dates seperator
  // checks if split array has the write length if not throws an Error
  // validates each segment: day, month, year thorws Error if validation fails.
  // If validation passed then the date will be returned as requested
  // As an array, a string or as a date object

  processDateString(date, returnString = false, returnObj = false) {
    let d = String(date).split('');

    if (d.includes('/')) {
      d = d.join('').split('/');
    }
    if (d.includes('-')) {
      d = d.join('').split('-');
    }
    if (d.includes('.')) {
      d = d.join('').split('.');
    }

    d = d.filter((x) => x !== '');

    if (d.length > 3 || d.length < 3) {
      throw new Error('Invalid date length');
    }

    this.validateAndSplitYear(d[0]);
    d[1] = this.validateMonth(d[1], true);
    this.validateDay(d[2]);

    if (returnString) {
      return d
        .map((x) => {
          if (String(x).length < 2) {
            return `0${x}`;
          }
          return String(x);
        })
        .join('-');
    }
    if (returnObj) {
      d = d.map((x) => Number(x));
      return {
        year: d[0],
        month: d[1],
        day: d[2],
      };
    }

    if (this.hasPrefix(d[0])) {
      d[1] = Number(d[1]);
      d[2] = Number(d[2]);
      return d;
    } else if (this.hasSuffix(d[0])) {
      d[1] = Number(d[1]);
      d[2] = Number(d[2]);
      return d;
    } else {
      return d.map((x) => Number(x));
    }
  }

  returnCentury(fullYear) {
    if (fullYear == 0) {
      return 0;
    }

    let year = this.validateAndSplitYear(fullYear);
    let extension = null;
    let century = null;

    if (this.hasPrefix(fullYear)) {
      extension = year.shift();
    } else if (this.hasSuffix(fullYear)) {
      extension = year.pop();
    }

    if (extension === 'AD' || extension === 'CE') {
      if (year.length > 3) {
        century = Number(year.splice(0, year.length - 2).join(''));
      } else if (year.length === 3) {
        century = year.shift();
      } else if (year.length < 3) {
        return 0;
      }
      return century * 100;
    } else if (extension === 'BC' || extension === 'BCE') {
      if (year.length > 3) {
        century = Number(year.splice(0, year.length - 2).join(''));
      } else if (year.length === 3) {
        century = year.shift();
      } else if (year.length < 3) {
        return 0;
      }
      return century * -100;
    } else if (Number(year.join('')) > 0) {
      if (year.length > 3) {
        century = Number(year.splice(0, year.length - 2).join(''));
      } else if (year.length === 3) {
        century = year.shift();
      } else if (year.length < 3) {
        return 0;
      }
      return century * 100;
    }
    throw new Error("Couldn't extract century from year");
  }

  getGregorianCenturyCode(fullYear) {
    let century = this.returnCentury(fullYear);
    let code = null;
    if (century >= 0) {
      if (century % 400 === 0) {
        code = 6;
      } else if (century % 400 === 100) {
        code = 4;
      } else if (century % 400 === 200) {
        code = 2;
      } else if (century % 400 === 300) {
        code = 0;
      }
      return code;
    } else {
      throw new Error('Can only calculate Gregorian century codes with centurys on, or later than the year 0');
    }
  }

  getJulianCenturyCode(fullYear) {
    let century = this.returnCentury(fullYear) / 100;

    if (century >= 0) {
      return ((18 - century) % 7) * -1;
    } else if (century < 0) {
      console.log(century);
      return (18 - century) % 7;
    } else {
      throw new Error('Invalid Julian century');
    }
  }

  getYearCode(fullYear) {
    let year = this.validateAndSplitYear(fullYear);

    if (this.hasPrefix(fullYear)) {
      year.shift();
    } else if (this.hasSuffix(fullYear)) {
      year.pop();
    }

    year.splice(0, year.length - 2);
    let yy = Number(year.join(''));

    return (yy + Math.floor(yy / 4)) % 7;
  }

  getMonthCode(numberOrName) {
    for (let month of months) {
      if (month.name === numberOrName || month.pos === numberOrName) {
        return month.code;
      }
    }
    throw Error('Argument must be a month name or its corresponding number');
  }

  matchWeekDayCode(modulusSevenRemainder) {
    if (modulusSevenRemainder === -1) {
      modulusSevenRemainder = 6;
    }
    for (let weekDay of weekDays) {
      if (weekDay.code === modulusSevenRemainder) {
        return weekDay.name;
      }
    }
    throw Error('Argument must be the result of a modulus 7 calculation on a date resulting in a number from 0 to 6 ');
  }

  isLeapYear(fullYear) {
    let year = Number(this.validateAndSplitYear(fullYear).join(''));
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  getLeapYearCode(dateArray) {
    if (this.isLeapYear(dateArray[0])) {
      if (dateArray[1] === 1 || dateArray[1] === 2) {
        return 1;
      }
    }
    return 0;
  }

  getDayOfTheWeek(date, GregorianDate = true) {
    date = this.processDateString(date);
    let centuryCode = GregorianDate ? this.getGregorianCenturyCode(date[0]) : this.getJulianCenturyCode(date[0]);
    let yearCode = this.getYearCode(date[0]);
    let leapYearCode = this.getLeapYearCode(date);
    let monthCode = this.getMonthCode(date[1]);
    let dayNumber = date[2];
    let dayCode = (((centuryCode + yearCode + monthCode + dayNumber) % 7) % 7) - leapYearCode;
    return this.matchWeekDayCode(dayCode);
  }

  getMonthWeekDays(fullYear, month) {
    let year = this.validateAndSplitYear(fullYear).join('');
    month = this.validateMonth(month, true);
    let dateObj = [];
    if (this.isLeapYear(year)) {
      for (let m of months) {
        if (m.shortName === 'Feb') {
          m.days = 29;
        }
      }
    } else {
      for (let m of months) {
        if (m.shortName === 'Feb') {
          m.days = 28;
        }
      }
    }
    for (let m of months) {
      if (m.pos === month) {
        let day = 1;
        while (day <= m.days) {
          dateObj.push({
            day: day,
            weekDay: this.getDayOfTheWeek(`${year}/${month}/${day}`),
            month: m.name,
            year: year,
          });
          day += 1;
        }
      }
    }
    return dateObj;
  }
  getFullCalendarYear(fullYear) {
    let year = this.validateAndSplitYear(fullYear).join('');
    let calendarObj = [];
    if (this.isLeapYear(year)) {
      for (let m of months) {
        if (m.shortName === 'Feb') {
          m.days = 29;
        }
      }
    } else {
      for (let m of months) {
        if (m.shortName === 'Feb') {
          m.days = 28;
        }
      }
    }
    for (let m of months) {
      calendarObj.push({ num: m.pos, [m.name]: [] });
      let day = 1;
      while (day <= m.days) {
        for (let mon of calendarObj) {
          if (Object.keys(mon)[1] === m.name) {
            mon[m.name].push({
              day: day,
              weekDay: this.getDayOfTheWeek(`${year}/${m.name}/${day}`),
            });
          }
        }
        day += 1;
      }
    }
    return calendarObj;
  }

  getCalendarGrid(fullYear, month) {
    let grid = [['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']];
    while (grid.length < 7) {
      grid.push(['', '', '', '', '', '', '']);
    }
    let calendarYear = this.getFullCalendarYear(fullYear);
    month = this.validateMonth(month, true);

    let prev = null;
    let curr = null;

    for (let m of calendarYear) {
      if (month !== 1) {
        if (m.num === month - 1) {
          prev = m[Object.keys(m)[1]];
        }
      } else {
        if (m.num === 12) {
          prev = m[Object.keys(m)[1]];
        }
      }
      if (m.num === month) {
        curr = m[Object.keys(m)[1]];
      }
    }

    let row = 1;

    for (let d of curr) {
      if (d.weekDay === 'Monday') {
        grid[row][0] = d.day;
      }
      if (d.weekDay === 'Tuesday') {
        grid[row][1] = d.day;
      }
      if (d.weekDay === 'Wednesday') {
        grid[row][2] = d.day;
      }
      if (d.weekDay === 'Thursday') {
        grid[row][3] = d.day;
      }
      if (d.weekDay === 'Friday') {
        grid[row][4] = d.day;
      }
      if (d.weekDay === 'Saturday') {
        grid[row][5] = d.day;
      }
      if (d.weekDay === 'Sunday') {
        grid[row][6] = d.day;
        row += 1;
      }
    }

    let pos1 = this.getPositionInCalendarGrid(grid, 1);
    pos1.col = pos1.col - 1;

    let posN = this.getPositionInCalendarGrid(grid, curr[curr.length - 1].day);
    posN.col = posN.col + 1;

    // Fill days before month
    let index = prev.length - 1;
    row = pos1.row;
    while (row > 0) {
      let col = pos1.col;
      while (col >= 0) {
        grid[row][col] = prev[index].day;
        index -= 1;
        col -= 1;
      }
      row -= 1;
    }
    index = 1;
    row = posN.row;

    // Fill days after month

    let num = 1;
    for (let row of grid) {
      if (row.includes('')) {
        for (let item of row) {
          if (item === '') {
            row[row.indexOf(item)] = num;
            num += 1;
          }
        }
      }
    }

    return grid;
  }

  getPositionInCalendarGrid(calendar, item) {
    for (let row of calendar) {
      for (let pos of row) {
        if (pos === item) {
          return {
            row: calendar.indexOf(row),
            col: row.indexOf(item),
          };
        }
      }
    }
  }
  getMonthsList() {
    return months;
  }
}

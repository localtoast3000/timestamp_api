import { CDP } from './CDP-config.js';
import CalendarDates from '../../../libs/CalendarDates.js';
import TrianglePointerSVG from './TrianglePointerSVG.js';

export default class Calendar extends CalendarDates {
  constructor(containerSelector, futureDatesOnly = false, maxYear = null, minYear = null, startDate = null) {
    super();
    this.containerSelector = containerSelector;
    this.container = document.querySelector(containerSelector);
    this.startDate =
      startDate !== null
        ? new Date((startDate = `${startDate.split('/')[1]}/${startDate.split('/')[0]}/${startDate.split('/')[2]}`))
            .toDateString()
            .split(' ')
        : new Date().toDateString().split(' ');
    this.months = this.getMonthsList();
    this.calendar = null;
    this.yearChanger = null;
    this.monthSelect = null;
    this.dayGrid = null;
    this.dropdown = false;
    this.calendar = null;
    this.minYear = futureDatesOnly ? this.startDate[3] : minYear;
    this.maxYear = maxYear;
    this.futureDatesOnly = futureDatesOnly;
    this.monthMinLimit = false;
    this.monthMaxLimit = false;
    this.yearMinLimit = false;
    this.yearMaxLimit = false;
    this.buildCalendarHTMLMarkup();
    this.addAllEventListeners();
  }

  buildCalendarHTMLMarkup() {
    this.container.innerHTML += `
    <div class="main-calender-container">
      <div class="triangle-pointer-svg-container">
        ${TrianglePointerSVG()}
      </div>
      <div class="${CDP.classNames.body}">
        <div class="${CDP.classNames.closeBtn}">
          <div class="${CDP.classNames.closeBtnX}"></div>
        </div>
        <div class="${CDP.classNames.header}">
          <div class="${CDP.classNames.yearSelect}">
            <button class="${CDP.classNames.decrementYear}"><div class="${
      CDP.classNames.btnTriangleLeft
    }"></div></button>
            <p class="${CDP.classNames.yearValue}"></p>
            <button class="${CDP.classNames.incrementYear}"><div class="${
      CDP.classNames.btnTriangleRight
    }"></div></button>
          </div>
          <div class="${CDP.classNames.monthSelect}">
            <button class="${CDP.classNames.previousMonth}"><div class="${
      CDP.classNames.btnTriangleLeft
    }"></div></button>
            <div class="${CDP.classNames.monthDropdown}"></div>
            <button class="${CDP.classNames.nextMonth}"><div class="${CDP.classNames.btnTriangleRight}"></div></button>
          </div>
        </div>
        <div class="${CDP.classNames.dayGrid}"></div>
      </div>
      </div>
  `;
    this.yearChanger = this.container.querySelector(`.${CDP.classNames.yearValue}`);
    this.monthSelect = this.container.querySelector(`.${CDP.classNames.monthDropdown}`);
    this.dayGrid = this.container.querySelector(`.${CDP.classNames.dayGrid}`);
    this.loadCalendarInterface();
  }

  addAllEventListeners() {
    this.container.addEventListener('click', this.incrementDecrementYearClickEvent.bind(this));
    this.container.addEventListener('click', this.toggleDropdownEvent.bind(this));
    this.container.addEventListener('click', this.monthClickHandler.bind(this));
    this.container.addEventListener('click', this.incrementDecrementMonthClickEvent.bind(this));
    this.container.addEventListener('click', this.addRemoveClassToSelectedDay.bind(this));
  }

  loadCalendarInterface() {
    if (this.futureDatesOnly) {
      this.addRemainingMonthsToDropdown(this.getMonthNameFromShortName(this.startDate[1]));
    } else {
      this.addMonthsToDropdown(this.getMonthNameFromShortName(this.startDate[1]));
    }
    this.setYearNow();
    this.updateCalendar();
    this.selectTodaysDay();
    this.removeDirectionBtnAtLimit();
  }

  incrementDecrementYearClickEvent(e) {
    if (
      e.target.classList[0] === CDP.classNames.decrementYear ||
      e.target.parentNode.classList[0] === CDP.classNames.decrementYear
    ) {
      this.changeYear('decrement');
      this.addClassToFirstDay();
    } else if (
      e.target.classList[0] === CDP.classNames.incrementYear ||
      e.target.parentNode.classList[0] === CDP.classNames.incrementYear
    ) {
      this.changeYear('increment');
      this.addClassToFirstDay();
    }
  }

  toggleDropdownEvent(e) {
    if (
      e.target.classList[0] === CDP.classNames.monthDropdown ||
      e.target.classList[0] === CDP.classNames.monthOption
    ) {
      this.dropdownSwitch();
    } else {
      this.dropdownSwitch(true);
    }
  }

  // A toggle switch that opens or closes the dropdown menu for selecting a month of the year

  dropdownSwitch(isOutside = false) {
    if (!this.dropdown) {
      this.dropdown = true;
    } else {
      this.dropdown = false;
    }
    if (isOutside) {
      this.dropdown = false;
    }
    if (this.dropdown) {
      this.monthSelect.classList.add(CDP.classNames.showMonthOptions);
    } else {
      this.monthSelect.classList.remove(CDP.classNames.showMonthOptions);
    }
  }

  monthClickHandler(e) {
    if (e.target.classList[1] === undefined && e.target.classList[0] === CDP.classNames.monthOption) {
      if (this.futureDatesOnly && this.selectedYearIsYearNow()) {
        this.addRemainingMonthsToDropdown(e.target.innerHTML);
      } else {
        this.addMonthsToDropdown(e.target.innerHTML);
      }
      this.removeDirectionBtnAtLimit();
      this.updateCalendar();
      this.addClassToFirstDay();
    }
  }

  removeDirectionBtnAtLimit() {
    try {
      let month = this.getSelectedMonth();

      if (
        (month === this.getMonthsLeftInYear()[0] && this.futureDatesOnly && this.selectedYearIsMinYear()) ||
        (month === 'January' && this.selectedYearIsMinYear())
      ) {
        this.container.querySelector(`.${CDP.classNames.previousMonth}`).style.display = 'none';
      } else {
        this.container.querySelector(`.${CDP.classNames.previousMonth}`).style = '';
      }
      if (month === 'December' && this.selectedYearIsMaxYear()) {
        this.container.querySelector(`.${CDP.classNames.nextMonth}`).style.display = 'none';
      } else {
        this.container.querySelector(`.${CDP.classNames.nextMonth}`).style.display = '';
      }
      if (this.selectedYearIsMinYear()) {
        this.container.querySelector(`.${CDP.classNames.decrementYear}`).style.display = 'none';
      } else {
        this.container.querySelector(`.${CDP.classNames.decrementYear}`).style = '';
      }
      if (this.selectedYearIsMaxYear()) {
        this.container.querySelector(`.${CDP.classNames.incrementYear}`).style.display = 'none';
      } else {
        this.container.querySelector(`.${CDP.classNames.incrementYear}`).style = '';
      }
    } catch {
      null;
    }
  }

  incrementDecrementMonthClickEvent(e) {
    {
      try {
        if (
          e.target.classList[0] === CDP.classNames.previousMonth ||
          e.target.parentNode.classList[0] === CDP.classNames.previousMonth
        ) {
          this.changeMonth('decrement');
          this.addClassToFirstDay();
        } else if (
          e.target.classList[0] === CDP.classNames.nextMonth ||
          e.target.parentNode.classList[0] === CDP.classNames.nextMonth
        ) {
          this.changeMonth('increment');
          this.addClassToFirstDay();
        }
      } catch {
        null;
      }
    }
    this.removeDirectionBtnAtLimit();
  }

  // Adds or removes a class name set in the "CDP.classNames.selectedDay" value to or from the clicked day

  addRemoveClassToSelectedDay(e) {
    if (e.target.classList[0] === CDP.classNames.dayNumberContainer && e.target.classList[1] === undefined) {
      this.removePreviousSelectedDay();
      e.target.classList.add(CDP.classNames.selectedDay);
    } else if (e.target.classList[0] === CDP.classNames.dayNumber && e.target.parentNode.classList[1] === undefined) {
      this.removePreviousSelectedDay();
      e.target.parentNode.classList.add(CDP.classNames.selectedDay);
    } else if (
      e.target.classList[0] === CDP.classNames.dayNumberContainer &&
      e.target.classList[1] === CDP.classNames.selectedDay
    ) {
      e.target.classList.remove(CDP.classNames.selectedDay);
    } else if (
      e.target.classList[0] === CDP.classNames.dayNumber &&
      e.target.parentNode.classList[1] === CDP.classNames.selectedDay
    ) {
      e.target.parentNode.classList.remove(CDP.classNames.selectedDay);
    }
  }

  // Returns the users selected year

  getSelectedYear() {
    return Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML);
  }

  // Returns the users selected month

  getSelectedMonth() {
    return this.container.querySelector(`.${CDP.classNames.monthOption}.${CDP.classNames.selectedMonth}`).innerHTML;
  }

  // Returns the users selected day

  getSelectedDay() {
    return Number(
      this.container.querySelector(`.${CDP.classNames.dayNumberContainer}.${CDP.classNames.selectedDay}`).childNodes[0]
        .innerHTML
    );
  }

  // Collects all the users selected date information and returns a date object of year, month, day
  // representing the users date choice

  getFullSelectedDateObject() {
    return {
      day: this.getSelectedDay(),
      month: this.getSelectedMonth(),
      year: this.getSelectedYear(),
    };
  }

  getMonthNumberFromShortName(sName) {
    for (let month of this.months) {
      if (month.shortName === sName) {
        return month.pos;
      }
    }
  }

  getMonthNumberFromLongName(lName) {
    for (let month of this.months) {
      if (month.name === lName) {
        return month.pos;
      }
    }
  }

  getMonthNameFromShortName(sName) {
    for (let month of this.months) {
      if (month.shortName === sName) {
        return month.name;
      }
    }
  }

  addZerosToNumberString(str, maxLength) {
    if (str.length === maxLength) {
      return str;
    } else {
      let count = maxLength - 1;
      while (count > 0) {
        str = '0' + str;
        count -= 1;
      }
      return str;
    }
  }

  getFullSelectedDateString() {
    let day = this.addZerosToNumberString(String(this.getSelectedDay()), 2);
    let month = this.addZerosToNumberString(String(this.getMonthNumberFromLongName(this.getSelectedMonth())), 2);
    let year = this.addZerosToNumberString(String(this.getSelectedYear()), 4);

    return `${day}/${month}/${year}`;
  }

  // Displays the current year in the year selector before any user selection is made

  setYearNow() {
    this.yearChanger.innerHTML += this.startDate[3];
  }

  setMonthsDropdown(newSelect) {
    if (this.futureDatesOnly && this.selectedYearIsYearNow()) {
      this.addRemainingMonthsToDropdown(newSelect);
    } else {
      this.addMonthsToDropdown(newSelect);
    }
  }

  decrementYear() {
    let selectedMonth = this.monthSelect.children[0].innerHTML;
    let remainingMonths = this.getMonthsLeftInYear();
    if (this.minYear !== null) {
      if (Number(this.yearChanger.innerHTML) > this.minYear) {
        this.yearChanger.innerHTML = Number(this.yearChanger.innerHTML) - 1;
        this.updateCalendar();
        this.setMonthsDropdown(selectedMonth);
        if (!remainingMonths.includes(selectedMonth)) {
          this.setMonthsDropdown(remainingMonths[0]);
        } else {
          this.setMonthsDropdown(selectedMonth);
        }
      }
    } else {
      this.yearChanger.innerHTML = Number(this.yearChanger.innerHTML) - 1;
      this.updateCalendar();
      this.setMonthsDropdown();
    }
  }

  incrementYear() {
    let selectedMonth = this.monthSelect.children[0].innerHTML;
    let remainingMonths = this.getMonthsLeftInYear();
    if (this.maxYear !== null) {
      if (Number(this.yearChanger.innerHTML) < this.maxYear) {
        this.yearChanger.innerHTML = Number(this.yearChanger.innerHTML) + 1;
        this.updateCalendar();
        this.setMonthsDropdown(selectedMonth);
        if (remainingMonths.includes(selectedMonth)) {
          this.setMonthsDropdown(remainingMonths[0]);
        } else {
          this.setMonthsDropdown(selectedMonth);
        }
      }
    } else {
      this.yearChanger.innerHTML = Number(this.yearChanger.innerHTML) - 1;
      this.updateCalendar();
      this.setMonthsDropdown();
    }
  }

  // Increments or decrements the year by 1

  changeYear(direction) {
    if (direction === 'decrement') {
      this.decrementYear();
    }
    if (direction === 'increment' && Number(this.yearChanger.innerHTML) < this.maxYear) {
      this.incrementYear();
    }
  }

  compareSelectedMonthWithMonthNow() {
    let selectedMonth = this.getMonthNumberFromLongName(
      this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
    );
    let monthNow = this.getMonthNumberFromShortName(this.startDate[1]);

    if (selectedMonth > monthNow) {
      return true;
    } else {
      return false;
    }
  }

  selectedYearIsYearNow() {
    let selectedYear = Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML);
    let yearNow = Number(this.startDate[3]);

    if (selectedYear === yearNow) {
      return true;
    } else {
      return false;
    }
  }

  selectedYearIsMaxYear() {
    let selectedYear = Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML);

    if (selectedYear >= this.maxYear) {
      return true;
    } else {
      return false;
    }
  }

  selectedYearIsMinYear() {
    let selectedYear = Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML);

    if (selectedYear <= this.minYear) {
      return true;
    } else {
      return false;
    }
  }

  decrementMonth() {
    let currSelectedMonth = this.monthSelect.childNodes[0].innerHTML;
    if (this.minYear !== null || this.minYear !== Infinity) {
      if (currSelectedMonth === 'January' && !this.selectedYearIsMinYear()) {
        this.addMonthsToDropdown(this.months[11].name);
        this.decrementYear();
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else {
        this.addMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) - 1].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      }
    } else {
      this.addMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) - 1].name);
      this.buildCalendar(
        Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
        this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
      );
    }
  }

  incrementMonth() {
    let currSelectedMonth = this.monthSelect.childNodes[0].innerHTML;
    if (this.maxYear !== null || this.maxYear !== Infinity) {
      if (currSelectedMonth === 'December' && !this.selectedYearIsMaxYear()) {
        this.addMonthsToDropdown(this.months[0].name);
        this.incrementYear();
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else {
        this.addMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) + 1].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      }
    } else {
      this.addMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) + 1].name);
      this.buildCalendar(
        Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
        this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
      );
    }
  }

  decrementMonthOfFutureDate() {
    try {
      let currSelectedMonth = this.monthSelect.childNodes[0].innerHTML;
      let monthNow = this.getMonthNameFromShortName(this.startDate[1]);

      if (currSelectedMonth === monthNow && this.selectedYearIsYearNow()) {
        this.addRemainingMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth)].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else if (currSelectedMonth === 'January' && !this.selectedYearIsYearNow()) {
        this.addMonthsToDropdown(this.months[11].name);
        this.decrementYear();
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else if (this.selectedYearIsYearNow()) {
        this.addRemainingMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) - 1].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else {
        this.addMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) - 1].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      }
    } catch {
      null;
    }
  }

  incrementMonthOfFutureDate() {
    try {
      let currSelectedMonth = this.monthSelect.childNodes[0].innerHTML;
      if (currSelectedMonth === 'December' && this.selectedYearIsMaxYear()) {
        this.addMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth)].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else if (currSelectedMonth === 'December' && !this.selectedYearIsMaxYear()) {
        this.addMonthsToDropdown(this.months[0].name);
        this.incrementYear();
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else if (this.selectedYearIsYearNow()) {
        this.addRemainingMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) + 1].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else if (this.selectedYearIsMaxYear()) {
        this.addMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) + 1].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      } else {
        this.addMonthsToDropdown(this.months[this.getIndexOfMonth(currSelectedMonth) + 1].name);
        this.buildCalendar(
          Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
          this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
        );
      }
    } catch {
      null;
    }
  }

  changeMonth(direction) {
    if (direction === null) {
      throw Error('Incorrect month direction given');
    }

    if (direction === 'decrement') {
      if (this.futureDatesOnly) {
        this.decrementMonthOfFutureDate();
      } else {
        this.decrementMonth();
      }
    } else if (direction === 'increment') {
      if (this.futureDatesOnly) {
        this.incrementMonthOfFutureDate();
      } else {
        this.incrementMonth();
      }
    }
  }

  getMonthNames() {
    let monthNames = [];

    for (let month of this.months) {
      monthNames.push(month.name);
    }
    return monthNames;
  }

  getMonthsLeftInYear() {
    let monthNow = this.getMonthNumberFromShortName(this.startDate[1]);
    let monthsRemaining = [];

    for (let month of this.months) {
      if (month.pos === monthNow) {
        for (let i = this.months.indexOf(month); i <= this.months.length - 1; i++) {
          monthsRemaining.push(this.months[i].name);
        }
        break;
      }
    }
    return monthsRemaining;
  }

  // Renders all months into the dropdown menu for selecting months of the year

  addMonthsToDropdown(newSelect) {
    let monthNames = this.getMonthNames();

    this.monthSelect.innerHTML = '';
    this.monthSelect.innerHTML += `<p class="${CDP.classNames.monthOption} ${CDP.classNames.selectedMonth}">${newSelect}</p>`;

    for (let month of monthNames) {
      this.monthSelect.innerHTML += `<p class="${CDP.classNames.monthOption}">${month}</p>`;
    }
  }

  addRemainingMonthsToDropdown(newSelect) {
    let remainingMonths = this.getMonthsLeftInYear();

    this.monthSelect.innerHTML = '';
    this.monthSelect.innerHTML += `<p class="${CDP.classNames.monthOption} ${CDP.classNames.selectedMonth}">${newSelect}</p>`;

    for (let month of remainingMonths) {
      this.monthSelect.innerHTML += `<p class="${CDP.classNames.monthOption}">${month}</p>`;
    }
  }

  getIndexOfMonth(m) {
    for (let month of this.months) {
      if (month.name === m || month.shortName === m || month.pos === m) {
        return this.months.indexOf(month);
      }
    }
  }

  yearBeforeSelectedYearIsYearNow() {
    let selectedYear = Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML);

    if (selectedYear - 1 === Number(this.startDate[3])) {
      return true;
    } else {
      return false;
    }
  }
  yearAfterSelectedYearIsMaxYear() {
    let selectedYear = Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML);

    if (selectedYear + 1 === this.maxYear) {
      return true;
    } else {
      return false;
    }
  }

  // Gets selected month, copys it, then puts the copy to the top of the elements DOM array to be displayed
  // it in the month select box as the currently selected month

  sendSelectedToTop() {
    let options = this.monthSelect.getElementsByTagName('p');
    for (let option of options) {
      if (option.classList[1] !== undefined && option.classList[1] === CDP.classNames.selectedMonth) {
        for (let month of this.months) {
          if (month.name === option.innerHTML) {
            let pos = month.pos - 1;
            options[pos].parentNode.insertBefore(options[pos], options[0]);
            break;
          }
        }
      }
    }
  }

  // Builds the calendar for rendering

  buildCalendar(year, month) {
    for (let m of this.months) {
      if (month === m.name) {
        month = m.name;
        break;
      }
    }
    this.calendar = this.getCalendarGrid(year, month);
    let grid = this.container.querySelector(`.${CDP.classNames.dayGrid}`);
    grid.innerHTML = '';
    for (let row of this.calendar) {
      row.map(
        (x) =>
          (grid.innerHTML += `<div class="${CDP.classNames.gridCell}"><div class="${CDP.classNames.dayNumberContainer}"><p class="${CDP.classNames.dayNumber}">${x}</p></div></div>`)
      );
    }
    this.addGreyoutClass();
    this.addClassToWeekDayNames();
    this.addClassToFriday();
  }

  updateCalendar() {
    this.buildCalendar(
      Number(this.container.querySelector(`.${CDP.classNames.yearValue}`).innerHTML),
      this.container.querySelector(`.${CDP.classNames.selectedMonth}`).innerHTML
    );
  }

  // Greys out all days representing the previous month and proceeding month

  addGreyoutClass() {
    let calendarGrid = this.container.querySelector(`.${CDP.classNames.dayGrid}`).childNodes;
    let month = this.getSelectedMonth();
    let year = this.getSelectedYear();
    if (
      this.futureDatesOnly &&
      month === this.getMonthNameFromShortName(this.startDate[1]) &&
      year === Number(this.startDate[3])
    ) {
      for (let i = 7; i < calendarGrid.length - 1; i++) {
        let day = Number(calendarGrid[i].childNodes[0].childNodes[0].innerHTML);
        if (day === Number(this.startDate[2])) {
          break;
        }
        calendarGrid[i].childNodes[0].classList.add(CDP.classNames.greyedOutDay);
      }
    } else {
      for (let i = 7; i < calendarGrid.length - 1; i++) {
        let day = Number(calendarGrid[i].childNodes[0].childNodes[0].innerHTML);
        if (day === 1) {
          break;
        }
        calendarGrid[i].childNodes[0].classList.add(CDP.classNames.greyedOutDay);
      }
    }
    for (let i = calendarGrid.length - 1; i > 0; i--) {
      let day = Number(calendarGrid[i].childNodes[0].childNodes[0].innerHTML);
      if (day > 20) {
        break;
      }
      calendarGrid[i].childNodes[0].classList.add(CDP.classNames.greyedOutDay);
    }
  }

  // Adds a class name set in the "CDP.classNames.weekdayName" value to all the grid cells representing
  // the names of the days of the week.
  // A class name set in "CDP.classNames.weekdayNameContainer" value is added to the inner
  // container of the weekday name grid cell to then be setup to not be styled when clicked unlike the
  // rest of the active current month day grid cells

  addClassToWeekDayNames() {
    let calendarGrid = this.container.querySelector(`.${CDP.classNames.dayGrid}`).childNodes;
    for (let i = 0; i <= 6; i++) {
      calendarGrid[i].classList.add(CDP.classNames.weekdayName);
      calendarGrid[i].childNodes[0].classList.add(CDP.classNames.weekdayNameContainer);
    }
  }

  // Adds a class name set in the "CDP.classNames.FridayWeekday" value to all items in the Friday column of the day grid.
  // The right most border can then be styled to create a partition for the weekend days

  addClassToFriday() {
    let calendarGrid = this.container.querySelector(`.${CDP.classNames.dayGrid}`).childNodes;
    for (let i = 0; i <= calendarGrid.length - 1; i++) {
      if (i % 7 === 0) {
        calendarGrid[i + 4].classList.add(CDP.classNames.FridayWeekday);
      }
    }
  }

  // Adds a class name set in the "CDP.classNames.selectedDay" value to todays day number, to be used with the "load"
  // event listener

  selectTodaysDay() {
    try {
      this.removePreviousSelectedDay();
    } catch {
      null;
    }
    for (let day of this.dayGrid.childNodes) {
      let d = day.childNodes[0].childNodes[0];
      if (
        Number(d.innerHTML) === Number(this.startDate[2]) &&
        d.parentNode.classList[1] !== CDP.classNames.greyedOutDay
      ) {
        day.childNodes[0].classList.add(CDP.classNames.selectedDay);
        break;
      }
    }
  }

  // Moves the selected day to the first day of the month when the month changes

  addClassToFirstDay() {
    let month = this.getSelectedMonth();
    let year = this.getSelectedYear();

    try {
      this.removePreviousSelectedDay();
    } catch {
      null;
    }
    if (
      this.futureDatesOnly &&
      month === this.getMonthNameFromShortName(this.startDate[1]) &&
      year === Number(this.startDate[3])
    ) {
      this.selectTodaysDay();
    } else {
      for (let day of this.dayGrid.childNodes) {
        let d = day.childNodes[0].childNodes[0];
        if (Number(d.innerHTML) === 1 && d.parentNode.classList[1] !== CDP.classNames.greyedOutDay) {
          day.childNodes[0].classList.add(CDP.classNames.selectedDay);
          break;
        }
      }
    }
  }

  // Removes the previously selected day ready to display a new selected day position

  removePreviousSelectedDay() {
    for (let day of this.dayGrid.childNodes) {
      let selectedClass = day.childNodes[0].classList[1];
      if (selectedClass === CDP.classNames.selectedDay) {
        day.childNodes[0].classList.remove(CDP.classNames.selectedDay);
        break;
      }
    }
  }
}

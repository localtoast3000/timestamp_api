import { CDP } from './CDP-config.js';
import Calendar from './Calendar.js';
import DateInput from './DateInput.js';

export default class CalendarDatePicker {
  constructor(
    setByCal = null,
    containerSelector,
    minYear,
    maxYear,
    startDate,
    futureDatesOnly = false,
    previousCDPDate = false
  ) {
    this.setByCal = setByCal;
    this.previousCDPDate = previousCDPDate;
    this.startDate = startDate;
    this.containerSelector = containerSelector;
    this.container = document.querySelector(containerSelector);
    this.minYear = minYear;
    this.maxYear = maxYear;
    this.futureDatesOnly = futureDatesOnly;
    this.calendar = null;
    this.calendarOpen = false;
    this.firstCalendarOpen = true;
    this.currentSelectedDate = this.startDate;
    this.addAllEventListeners();
  }

  addAllEventListeners() {
    window.addEventListener('load', this.buildDateInputOnLoad.bind(this));
    this.container.addEventListener('click', this.toggleCalendarDatePickerEvent.bind(this));
  }

  buildDateInputOnLoad() {
    new DateInput(this.containerSelector, this.startDate);
    if (this.setByCal !== null) {
      this.setThisDateInputValueToSetCalValue();
    }
  }

  toggleCalendarDatePickerEvent(e) {
    if (
      e.target.classList[0] === CDP.classNames.openCalendarIcon ||
      e.target.parentNode.classList[0] === CDP.classNames.openCalendarIcon ||
      e.target.parentNode.parentNode.parentNode.classList[0] === CDP.classNames.openCalendarIcon
    ) {
      this.openCalendar();
      document.querySelector('.request-button').style.display = 'none';
    } else if (
      e.target.classList[0] === CDP.classNames.closeBtn ||
      e.target.classList[0] === CDP.classNames.closeBtnX
    ) {
      this.closeCalendar();
      document.querySelector('.request-button').style.display = 'flex';
    }
  }

  setThisDateInputValueToSetCalValue() {
    let setCalValue = document.querySelector(this.setByCal).querySelector(`.${CDP.classNames.dateInput}`).value;
    this.currentSelectedDate = setCalValue;
    this.container.querySelector(`.${CDP.classNames.dateInput}`).value = setCalValue;
  }

  openCalendar() {
    this.removeAndRebuildEventListeners();
    if (this.setByCal !== null) {
      this.setThisDateInputValueToSetCalValue();
    }
    this.rebuildCalendar();
    this.calendarOpen = true;
    this.container.querySelector(`.${CDP.classNames.dateInput}`).value = this.calendar.getFullSelectedDateString();
  }

  closeCalendar() {
    new DateInput(this.containerSelector, this.calendar.getFullSelectedDateString());
    this.calendarOpen = false;
  }

  removeAndRebuildEventListeners() {
    this.container.replaceWith(this.container.cloneNode(true));
    this.container = document.querySelector(this.containerSelector);
    this.addAllEventListeners();
  }

  rebuildCalendar() {
    if (this.calendarOpen) {
      return;
    } else {
      this.calendar = new Calendar(
        this.containerSelector,
        this.futureDatesOnly,
        this.maxYear,
        this.minYear,
        this.currentSelectedDate
      );

      this.calendarOpen = true;
    }
  }
}

import { CDP } from './build/CDP-config.js';
import CalendarDatePicker from './build/CDP.js';
import CalenderDates from '../../libs/CalendarDates.js';

export default () => {
  return new CDPcontext();
};

// Import this default export above that is an instance of this CDPcontext class into your main project
// script and call the appendCDP method passing in these arguments:
//
//      containerSelector -> The selector, eg ".class" of the container
//                           that you wish to load the CDP into. (container
//                           must already be defined in your markup)
//
//                minYear -> Defines a lower year limit to stop the calendar from decrementing past when set,
//                           set to null or -Infintiy if no lower limit is required
//
//                maxYear -> Defines a higher year limit to stop the calendar from incrementing past when set,
//                           set to null or Infintiy if no higher limit is required
//
//              startDate -> Defines the starting date of the calendar and date input field when first rendered
//
//        futureDatesOnly -> Takes a boolean, if set to true the calendar will block and grey out all past dates
//                           starting from the provided startDate
//
//               setByCal -> Takes a selector eg ".class" that will represent another CDP in which this CDP will get
//                           its start date from every time the other CDP has its value set. To be used with
//                           futureDatesOnly. Good for out and return trip setups where the return trip has to be later
//                           than the out trip.
//                           The referenced CDP on which this CDP is to get its value from must be rendered before a
//                           value can be obtained.
//                           Order of rendering is important!
//
// NOTE: There can be only one calendar depending on another. But you can have as many independent pairs as you like on a webpage.

class CDPcontext extends CalenderDates {
  constructor() {
    super();
    this.loadedCalendarDatePickers = [];
    this.firstAppend = true;
    this.currentlyOpen = null;
    this.dateToday = new Date();
    this.defaultValues = {
      setByCal: null,
      containerSelector: '.cal1',
      minYear: this.dateToday.getFullYear() - 3,
      maxYear: this.dateToday.getFullYear() + 3,
      startDate: null,
      futureDatesOnly: false,
    };
    this.setStartDateToToday();
  }
  appendNewCDP({ setByCal, containerSelector, minYear, maxYear, startDate, futureDatesOnly } = this.defaultValues) {
    this.loadedCalendarDatePickers.push(
      new CalendarDatePicker(setByCal, containerSelector, minYear, maxYear, startDate, futureDatesOnly)
    );
    if (this.firstAppend) {
      document.addEventListener('click', this.listenForOpenCalendars.bind(this));
      this.firstAppend = false;
    }
  }

  listenForOpenCalendars(e) {
    try {
      if (
        e.target.classList[0] === CDP.classNames.openCalendarIcon ||
        e.target.parentNode.classList[0] === CDP.classNames.openCalendarIcon ||
        e.target.parentNode.parentNode.parentNode.classList[0] === CDP.classNames.openCalendarIcon
      ) {
        this.closeOpenedCal();
      }
    } catch {
      null;
    }
  }

  getLoadedCDPs() {
    return this.loadedCalendarDatePickers;
  }

  moreThanOneOpen() {
    let opened = [];
    for (let cal of this.loadedCalendarDatePickers) {
      if (cal.calendarOpen) {
        opened.push(cal);
      }
    }
    if (opened.length > 1) {
      return true;
    } else {
      if (opened.length === 1) {
        this.currentlyOpen = opened[0];
      }
      return false;
    }
  }

  closeOpenedCal() {
    if (!this.moreThanOneOpen()) {
      return;
    } else {
      this.currentlyOpen.closeCalendar();
      this.moreThanOneOpen();
    }
  }

  setStartDateToToday() {
    const arr = this.dateToday.toDateString().split(' ');
    const processedArr = this.processDateString(`${arr[3]}/${this.validateMonth(arr[1], true)}/${arr[2]}`, true).split(
      '-'
    );
    this.defaultValues.startDate = `${processedArr[2]}/${processedArr[1]}/${processedArr[0]}`;
  }
}

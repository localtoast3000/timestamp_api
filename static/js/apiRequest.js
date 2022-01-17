import APIrequestInterface from './libs/APIrequestInterface.js';

class TimestampRequests extends APIrequestInterface {
  constructor(version) {
    super(version);
    this.category = 'timestamp';
  }

  timestamp(params, callback) {
    params = this.validateParams(params);
    console.log(params);
    this.req.getData(`${this.version}/${this.category}?${params}`).then((res) => {
      callback(res);
    });
  }
}

const tsp = new TimestampRequests('v1');
const reqBtn = document.querySelector('.request-button');

reqBtn.addEventListener('click', () => {
  const selectedDate = document.querySelector('.CDP-date-input').value;
  const selectedTime = '12:30:10';
  const selectedCountry = 'IN';
  const selectedTimeZone = 'Asia/Kolkata';

  tsp.timestamp(
    { date: selectedDate, time: selectedTime, lang: 'en', country: selectedCountry, timezone: selectedTimeZone },
    (data) => {
      document.querySelector('.results-table').innerHTML = `
          <tr class="results-table-row">
            <th class="results-table-header h5 results-tabel-cell">Timestamp</th>
            <td class="results-table-data results-tabel-cell p">
                ${data.timestamp}
            </td>
          </tr>
          <tr class="results-table-row">
              <th class="results-table-header h5 results-tabel-cell">Date</th>
              <td class="results-table-data results-tabel-cell p">${data.date}</td>
          </tr>
          <tr class="results-table-row">
              <th class="results-table-header h5 results-tabel-cell">Time</th>
              <td class="results-table-data results-tabel-cell p">${data.time}</td>
          </tr>
          <tr class="results-table-row">
              <th class="results-table-header h5 results-tabel-cell">Country</th>
              <td class="results-table-data results-tabel-cell p">${data.country}</td>
          </tr>
          <tr class="results-table-row results-last-row">
              <th class="results-table-header h5 results-tabel-cell">Time zone</th>
              <td class="results-table-data results-tabel-cell p">${data.timezone}</td>
          </tr>
        `;
    }
  );
});

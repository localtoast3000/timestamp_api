import Timestamp from '../libs/Timestamp/Timestamp.js';

const initTimestamp = new Promise((resolve, reject) => {
  resolve();
});

initTimestamp
  .then(() => {
    const tsp = new Timestamp({});
    logInSpace(tsp);
    logInSpace(tsp.setDateTime('19/02/2022', 'DMY'));
    logInSpace(tsp.getWeekDay('long'));
    logInSpace(tsp.formatNumericDate('12/10/2016', 'DMY', 'YMD'));
  })
  .catch((error) => {
    logInSpace(error);
  });

function logInSpace(content) {
  console.log('');
  console.log(content);
  console.log('');
}

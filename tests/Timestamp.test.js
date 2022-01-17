import Timestamp from '../libs/Timestamp/Timestamp.js';

const tsp = new Timestamp({ date: '28/2/2021', dateFormat: 'DMY' });

console.log('');
// console.log(
//   `Local date and time in India ${tsp.getForeignTimestamp({ lang: 'en', country: 'IN', timezone: 'Asia/Kolkata' })}`
// );
console.log(tsp);
console.log('');

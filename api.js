import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'chalk';
import logRequestsToConsole from './middleware/consoleLog.js';
import { noCache } from './middleware/headers.js';
import Timestamp from './libs/Timestamp/Timestamp.js';

dotenv.config({ path: path.join('.', '.env') });

const api = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
const static_dir = path.join('.', 'static');

api.set('view engine', 'ejs');

api.use(helmet());
api.use(cors());
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(express.static(static_dir));
api.use(logRequestsToConsole);
api.use(noCache);

api.get('/', noCache, (req, res) => {
  res.render('index', { titleExt: null });
});

api.get('/api/v1/timestamp', (req, res) => {
  const tsp = new Timestamp({ date: req.query.date, dateFormat: 'DMY', time: req.query.time });

  const lcz = {
    lang: req.query.lang,
    country: req.query.country,
    timezone: req.query.timezone,
  };

  if (lcz.country === undefined || lcz.timezone === undefined) {
    res.json({
      timestamp: tsp.timestamp,
      date: tsp.date,
      time: tsp.time,
      country: tsp.country,
      timezone: tsp.timezone,
    });
  }
});

api.listen(PORT, HOST, () => {
  console.log(chalk());
  console.log(`
\n${chalk.bold.yellow('SERVER')}: [ ${chalk.bold.cyan('HOST')}: ${chalk.bold.white(HOST)}, ${chalk.bold.cyan(
    'PORT'
  )}: ${chalk.bold.white(PORT)} ]\n
http://${HOST}:${PORT}
`);
});

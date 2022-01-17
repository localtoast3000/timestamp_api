import chalk from 'chalk';

export default function logRequestsToConsole(req, res, next) {
  const method = req.method;
  const url = req.url.split('/');
  const status = res.statusCode;
  url.shift();
  const first = url.shift();
  let methodColor = '';
  let urlColor = '';
  let statusColor = '';

  if (method === 'GET') {
    methodColor = 'magenta';
  } else if (method === 'POST') {
    methodColor = 'yellow';
  }

  if (status >= 100 && status < 200) {
    urlColor = 'white';
    statusColor = 'bgWhite';
  } else if (status >= 200 && status < 300) {
    urlColor = 'green';
    statusColor = 'green';
  } else if (status >= 300 && status < 400) {
    urlColor = 'yellow';
    statusColor = 'bgYellow';
  } else if (status >= 400 && status < 600) {
    urlColor = 'red';
    statusColor = 'red';
  }

  console.log(
    `${chalk.bold[methodColor](method)}: ${first !== '' ? chalk.bold.green('/') : ''}${
      first === 'error' ? chalk.bold.red(first) : chalk.bold.green(first)
    }${chalk.bold.green('/')}${chalk.bold[urlColor](url.join('/'))}\n`
  );
  next();
}



/* esliny-disable no-console */

const jsf = require('json-schema-faker');
const fs = require('fs');
const chalk = require('chalk');
const schema = require('./mockDataSchema');

const json = JSON.stringify(jsf(schema));

fs.writeFile('./src/api/db.json', json, (err) => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.green('Mock data generated.'));
  }
});


/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const containerGenerator = require('./container/index.js');
const moduleGenerator = require('./module/index.js');

module.exports = (plop) => {
  plop.setGenerator('module', moduleGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(`src/shared/universal/modules/${comp}`, fs.F_OK);
      return `src/shared/universal/modules/${comp}`;
    } catch (e) {
      return `src/shared/universal/container/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};

/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const pageContainers = fs.readdirSync('src/shared/universal/containers');
const pageModules = fs.readdirSync('src/shared/universal/modules');
const components = pageContainers.concat(pageModules);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;

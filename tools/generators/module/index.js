/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a Module ',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'ModuleName',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A module or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantHeaders',
    default: true,
    message: 'Do you want headers?',
  }, {
    type: 'confirm',
    name: 'wantCSS',
    default: false,
    message: 'Does it have styling?',
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/selectors/reducer tupel for this module?',
  }, {
    type: 'confirm',
    name: 'wantSagas',
    default: true,
    message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
  }],
  actions: (data) => {
    // Generate index.js and homePage.js
    const actions = [{
      type: 'add',
      path: '../../src/shared/universal/modules/{{properCase name}}/index.js',
      templateFile: './module/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../src/shared/universal/modules/{{properCase name}}/homePage.js',
      templateFile: './module/homePage.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../src/shared/universal/modules/{{properCase name}}/router.js',
      templateFile: './module/router.js.hbs',
      abortOnFail: true,
    }];

    // If they want a CSS file, add styles.css
    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: '../../src/shared/universal/modules/{{properCase name}}/styles.css',
        templateFile: './module/styles.css.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../src/shared/universal/modules/{{properCase name}}/actions.js',
        templateFile: './module/actions.js.hbs',
        abortOnFail: true,
      });
      // Constants
      actions.push({
        type: 'add',
        path: '../../src/shared/universal/modules/{{properCase name}}/constants.js',
        templateFile: './module/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../src/shared/universal/modules/{{properCase name}}/selectors.js',
        templateFile: './module/selectors.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../src/shared/universal/modules/{{properCase name}}/reducer.js',
        templateFile: './module/reducer.js.hbs',
        abortOnFail: true,
      });

    }

    // Sagas
    if (data.wantSagas) {
      actions.push({
        type: 'add',
        path: '../../src/shared/universal/modules/{{properCase name}}/sagas.js',
        templateFile: './module/sagas.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};

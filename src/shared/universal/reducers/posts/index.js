/*       */

import { combineReducers } from 'redux';
//import {combineReducers} from 'redux-immutable';

import all, * as FromAll from './all';


import byId, * as FromById from './byId';


// -----------------------------------------------------------------------------
// EXPORTED REDUCER STATE TYPE


// -----------------------------------------------------------------------------
// REDUCER

const posts = combineReducers({
  all,
  byId,
});

// -----------------------------------------------------------------------------
// EXPORTED SELECTORS

export function getById(state, id) {
  console.log(state);
  return FromById.getById(state.byId, id);
}

export function getAll(state) {
  return FromAll
    .getAll(state.all)
    .map(id => getById(state, id));
}

// -----------------------------------------------------------------------------
// REDUCER EXPORT

export default posts;

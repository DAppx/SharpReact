/**
 * Created by chengdi on 2016/11/23.
 */
//import { combineReducers } from 'redux';
import {combineReducers} from 'redux-immutable';
// -----------------------------------------------------------------------------
// EXPORTED REDUCER STATE TYPE
import {fromJS} from 'immutable';

// -----------------------------------------------------------------------------
// PRIVATES

const alldefaultState = fromJS([]);

// -----------------------------------------------------------------------------
// REDUCER

export const all = (state = alldefaultState, action) => {
  if (action.type === 'FETCHED_M_POST') {
    const post = action.payload;
    return state.find(x => post.id === x)
      ? state
      : [...state, action.payload.id];
  }

  return state;
}
const byiddefaultState = fromJS({test:1});

export const byId = (state = byiddefaultState, action) => {
  if (action.type === 'FETCHED_M_POST') {
    const ids= 'u:'+action.payload.id;
    return state.set(ids,action.payload);

  }

  return state;
}

// -----------------------------------------------------------------------------
// REDUCER

const posts = combineReducers({
  all,
  byId,
});

// const postReducer = combineReducers({
//   posts,
// });
// export default postReducer;
//
 export default posts;
//export default {byId, all};

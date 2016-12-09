/*       */

import { combineReducers } from 'redux';


import posts, * as FromPosts from './posts';


// -----------------------------------------------------------------------------
// EXPORTED REDUCER STATE TYPE


// -----------------------------------------------------------------------------
// REDUCER

const postReducer = combineReducers({
  posts,
});

// -----------------------------------------------------------------------------
// EXPORTED SELECTORS

export function getPostById(state, id) {
  return FromPosts.getById(state.posts, id);
}

// -----------------------------------------------------------------------------
// REDUCER EXPORT

export default postReducer;

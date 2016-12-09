import {combineReducers} from 'redux-immutable';
import {errorMessage, router} from './common/reducers';
import {entities, pagination} from './github/reducers';
import exampleReducer from './Example/reducer';

//import posts from '../reducers';
// import {combineReducers} from 'redux-immutable';
 import posts from './posts/reducers';
// import postReducer from '../reducers';
// import storage from '../store/modules/store';
// import localization from '../store/modules/locale';
// import toggleReducer from '../store/modules/toggle';
// import counter from '../store/modules/counter';

const rootReducer = combineReducers({
  entities,
   pagination,
  // errorMessage,
  router,
  example: exampleReducer,
  posts
  // toggle: toggleReducer,
  // localization,
  // storage,
  // counter
});

// // -----------------------------------------------------------------------------
// // EXPORTED SELECTORS
//
// export function getPostById(state, id) {
//   console.log('getPostById rootReducer');
//   console.log(state);
//   console.log(postReducer);
//   console.log(FromPosts);
//   return FromPosts.getById(state.posts, id);
// }



export default rootReducer;


//import merge from 'lodash/merge';
import union from 'lodash/union';
import {merge, fromJS} from 'immutable';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;
  const initState=fromJS({
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  });
  const initStateByKey=fromJS({});
  function updatePagination(state = initState, action) {
    switch (action.type) {
      case requestType:
        return state.merge({
          isFetching: true
        });
      case successType:
        return state.merge( {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1
        });
      case failureType:
        return state.merge({
          isFetching: false
        });
      default:
        return state;
    }
  }

  return function updatePaginationByKey(state = initStateByKey, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return state.merge( {
          [key]: updatePagination(state.get(key), action)
        });
      }
      default: {
        return state;
      }
    }
  };
}

//import merge from 'lodash/merge';
import {merge, fromJS} from 'immutable';
//import { combineReducers } from 'redux';
import {combineReducers} from 'redux-immutable';
import * as ActionTypes from './actions';
import * as CommonActionTypes from '../common/actions';

import paginate from './paginate';

// Updates an entity cache in response to any action with response.entities.
//
const intialentitiesState = fromJS({ users: {}, repos: {} });
const intialerrorMessageState = fromJS(null);
const intialrouterState = fromJS({ pathname: '/' });
export const entities = (state = intialentitiesState, action) => {

//  console.log('entities reducer action',action);
  if (action.response && action.response.entities) {
    // console.log('entities reducer orgin state',state);
    // const re= state.merge(action.response.entities);
    // const re3=fromJS(action.response.entities)
    // console.log('users.map',fromJS(action.response.entities.users));
    // console.log('users.map merge1',state.get('users').merge(fromJS(action.response.entities.users)));
    // console.log('users.map merge2',state.get('users').merge(action.response.entities.users));
    // const re1= state.mergeIn(['users'],fromJS(action.response.entities.users));
    //  //return merge({}, state, action.response.entities);
    // console.log('entities reducer',action.response.entities);
    //
    // console.log('reducer merge re:',re);
    // console.log('reducer merge re1 mergeIn:',re1);
    // console.log('reducer merge re1:',re3);
    return state.mergeIn(['users'],action.response.entities.users).mergeIn(['repos'],action.response.entities.repos);
  }
  return state;
};

// Updates error message to notify about the failed fetches.
export const errorMessage = (state = intialerrorMessageState, action) => {
  const { type, error } = action;

  if (type === CommonActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
};

// Updates the pagination data for different actions.
export const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED.REQUEST,
      ActionTypes.STARRED.SUCCESS,
      ActionTypes.STARRED.FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS.REQUEST,
      ActionTypes.STARGAZERS.SUCCESS,
      ActionTypes.STARGAZERS.FAILURE
    ]
  })
});

export const router = (state = intialrouterState, action) => {
  switch (action.type) {
    case CommonActionTypes.UPDATE_ROUTER_STATE:
      return action.state;

    default:
      return state;
  }
};

export default {
  entities,
  pagination,
  errorMessage,
  router
};

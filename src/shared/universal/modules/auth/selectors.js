/**
 * Created by chengdi on 2016/12/7.
 */
import {createSelector} from 'reselect';

// use immutable.js
export const selectAuthReducer = () => state => state.get('auth');

export const selectAuthReducerDomain = () => createSelector(
  selectAuthReducer(),
  substate => substate.toJS()  //

);

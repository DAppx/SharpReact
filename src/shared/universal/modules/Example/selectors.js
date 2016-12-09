import {createSelector} from 'reselect';

// use immutable.js
export const selectHomeReducer = () => state => state.get('example');
//export const selectHomeReducer = () => state => state.example;

export const selectHomeReducerDomain = () => createSelector(
  selectHomeReducer(),
  substate => substate.toJS()  //

);


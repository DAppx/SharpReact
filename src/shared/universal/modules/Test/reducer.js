/*
 *
 * Test reducer
 *
 */

import { fromJS } from 'immutable';
import {
TEST_DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({});

function testReducer(state = initialState, action) {
  switch (action.type) {
    case TEST_DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default testReducer;

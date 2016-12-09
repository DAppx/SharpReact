/**
 * Created by chengdi on 2016/12/6.
 */

import {fromJS, merge} from 'immutable';
import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR
} from './constants'
import auth from './authApi'

// The initial auth  state
let initialState = fromJS({
  formState: {
    username: '',
    password: '' // 实际产品中应该加密
  },
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn()
});

// Takes care of changing the application state
function authReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return state.merge({formState: action.newFormState})
    case SET_AUTH:
      return state.set('loggedIn', action.newAuthState)
    case SENDING_REQUEST:
      return state.set('currentlySending',action.sending)
    case REQUEST_ERROR:
      return state.merge({error: action.error})
    case CLEAR_ERROR:
      return state.merge({error: ''})
    default:
      return state
  }
}

export default authReducer


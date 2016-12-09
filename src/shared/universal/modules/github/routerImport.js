/**
 * Created by chengdi on 2016/12/2.
 */
import * as actions from './actions';
import reducers from './reducers';
import sagas from './sagas';
import * as selectors from './selectors';
import User from '../../containers/UserPage';

export default {
  User,
  actions,
  reducers,
  sagas,
  selectors
};

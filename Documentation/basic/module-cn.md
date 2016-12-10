# module 开发

## 步骤

命令行运行下命令；

     `npm run module`

*Step 1.*输入模块名称  如：module1

*Step 2.*系统会在src/shared/universal/modules/module1下生成模块需要的模板文件
  
1. `actions.js`

2. `constants.js`

3. `homePage.js`

4. `index.js`

5. `reducer.js`

6. `router.js`

7. `sagas.js`

8. `selectors.js`



### constants

定义模块中使用的常量

命名约定全部大写表示，以模块名称开头



```JavaScript
export const TEST_CHANGE_USERNAME_FIELD = 'TEST_CHANGE_USERNAME_FIELD';
export const TEST_USERNAME_FETCH_SUCCESS = 'TEST_USERNAME_FETCH_SUCCESS';
export const TEST_USERNAME_FETCH_ERROR = 'TEST_USERNAME_FETCH_ERROR';

export const TEST_CHANGE_USERNAME_FIELD = 'MODULES/TEST/CHANGE_USERNAME_FIELD';
export const TEST_USERNAME_FETCH_SUCCESS = 'MODULES/TEST/USERNAME_FETCH_SUCCESS';
export const TEST_USERNAME_FETCH_ERROR = 'MODULES/TEST/USERNAME_FETCH_ERROR';

```
### actions

定义redux 中的Action

命名约定按照模块名称开头-使用camelCase 格式编写

```JavaScript
export function testUserNameFetchSuccess(payload) {
  return {
    type: TEST_USERNAME_FETCH_SUCCESS,
    payload,
  };
}

export function testChangeUsernameField(username) {
  return {
    type: TEST_CHANGE_USERNAME_FIELD,
    payload: username,
  };
} 
export function testUserNameFetchError(error) {
  return {
    type: TEST_USERNAME_FETCH_ERROR,
    payload: error,
  };
}
```
### reducer

使用immutable.js

命名约定 模块名+Reducer 使用camelCase 格式编写

```JavaScript
const intialState = fromJS({
  queriedUsername: '',
  fetchErrors: false,
  fetchData: false,
});

 function testReducer(state = intialState, action) {
  switch (action.type) {
    case TEST_CHANGE_USERNAME_FIELD:
      return state.set('queriedUsername', action.payload);
    case TEST_USERNAME_FETCH_ERROR:
      return state
        .set('fetchErrors', action.payload);
    case TEST_USERNAME_FETCH_SUCCESS:
      return state
        .set('fetchErrors', false)
        .set('fetchData', action.payload);
    default:
      return state;
  }
}

export default testReducer
```

### sagas

约定分为两个部分，
上面部分为 WORKER SAGAS

下面部分为 WATCHER SAGAS ，约定 watcher saga 命名中使用Watcher ，便于功能的区分

export 按照数据方式[],便于AsyncInjectSagas;

一般只需要导出 root watcher 


```JavaScript
import {fork, call, put} from 'redux-saga/effects';
import {takeLatest, delay} from 'redux-saga';
import request from '../../utils/request';
import {TEST_CHANGE_USERNAME_FIELD} from './constants';
import {testUserFetchSuccess, testUsernameFetchError} from './actions';

/**
 ****************************** WORKER SAGAS***********************************
 **/
function* asyncFetchDataExample({payload}) {
  if (payload.length >= 3) {
    yield call(delay, 1000); // We want to start fetching when idle for more than one second
    // We only want to fetch when there are more than 3 letters in the username field
    const fetchUrl = `https://api.github.com/users/${payload}/starred`;
    const asyncFetchData = yield call(request, fetchUrl);
    if (!asyncFetchData.err) {
      yield put(testUsernameFetchSuccess(asyncFetchData.data));
    } else {
      yield put(testUsernameFetchError(asyncFetchData.err.message));
    }
  }
}

/**
 ****************************** WATCHER SAGAS ***********************************
 **/

function* testUserNameFieldWatcher() {
  yield takeLatest(TEST_CHANGE_USERNAME_FIELD, asyncFetchDataExample);
}

function* testRootWatcher() {
  yield [
    fork(testUserNameFieldWatcher),
  ];
}

export default [testRootWatcher];
```
### router

每个模块的React-Router V4 的 MATCH以及相应的RENDER function

可以在MACTCH 中根据业务要求，增加AUTH、Redirect 等功能

可以完成code splitting 功能 ， asyncInjectReducer asyncInjectSagas ; 

将router 导入 App.js 或其他 Components 中


```JavaScript
const MatchWithTest = ({store, ...rest}) => {
  return (
    <Match {...rest} render={testRouterRender(store)}/>
    )
};
const testRouterRender = (store) => {
  const {injectReducer, injectSagas} = getAsyncInjectors(store);
  return function (routerProps) {
    return (
      <CodeSplit chunkName="test" modules={
        {
           modules: require('../Test')
       }
      }>
      { ({ modules }) => {
      if (!modules) return <div />;
      const {Page}= modules;
      injectReducer('test', modules.reducer);
      injectSagas(modules.sagas);
      return Page && <Page {...routerProps} />
       } }
     </CodeSplit>
    )
  }
};

export default MatchWithTest;
```

### selectors

根据业务要求，从Store中selector 数据

```JavaScript
import { createSelector } from 'reselect';
/**
 * Direct selector to the test state domain
 */
const selectTestDomain = () => (state) => state.get('test');
/**
 * Other specific selectors
 */
/**
 * Default selector used by Test
 */

const selectTest = () => createSelector(
  selectTestDomain(),
  (substate) => substate.toJS()
);

export default selectTest;
export {
  selectTestDomain,
};
```

### index

export 该模块中的相关信息，用于加载或引用；

如router中   modules: require('../Test') 

```JavaScript
import * as actions from './actions';
import reducer from './reducer';
import sagas from './sagas';
import * as selectors from './selectors';
import Page from './homePage';

export default {
    actions,
    reducer,
    sagas,
    selectors,
    Page
    };
```

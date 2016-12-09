<p align='center'>
  <h1 align='center'>Redux-Saga, Notes 学习笔记</h1>
</p>

## 知识点

 - redux-saga 是一个用于管理 Redux 应用异步操作（Side Effects。译注：直译成 “副作用” 不太通顺，所以这里译为 “异步操作” 更好理解）的中间件（又称异步 action）。
  redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件。
  这意味着应用的逻辑会存在两个地方：
  Reducers 负责处理 action 的 state 更新。
   Sagas 负责协调那些复杂或异步的操作。
   Sagas 是通过 Generator 函数来创建的
  Sagas 不同于 Thunks，Thunks 是在 action 被创建时调用，而 Sagas 只会在应用启动时调用（但初始启动的 Sagas 可能会动态调用其他 Sagas）。 Sagas 可以被看作是在后台运行的进程。Sagas 监听发起的 action，然后决定基于这个 action 来做什么：是发起一个异步调用（比如一个 Ajax 请求），还是发起其他的 action 到 Store，甚至是调用其他的 Sagas。
在 redux-saga 的世界里，所有的任务都通用 yield Effects 来完成（译注：Effect 可以看作是 redux-saga 的任务单元）。Effects 都是简单的 Javascript 对象，包含了要被 Saga middleware 执行的信息（打个比方，你可以看到 Redux action 其实是一个个包含执行信息的对象）。 redux-saga 为各项任务提供了各种 Effect 创建器，比如调用一个异步函数，发起一个 action 到 Store，启动一个后台任务或者等待一个满足某些条件的未来的 action。
因为使用了 Generator，redux-saga 让你可以用同步的方式写异步代码。就像你可以使用 async/await 函数所能做的一样。但 Generator 可以让你做一些 async 函数做不到的事情。
事实上 Sagas yield 普通对象的方式让你能容易地测试 Generator 里所有的业务逻辑，可以通过简单地迭代 yield 过的对象进行简单的单元测试。
此外，redux-saga 启动的任务可以在任何时候通过手动取消，也可以把任务和其他的 Effects 放到 race 方法里以自动取消。
import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
  yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
}

开始这个应用之前，我们需要将 watchIncrementAsync 这个 Saga 连接至 Store：
注意我们不需要连接 incrementAsync 这个 Saga，因为它会在每次 INCREMENT_ASYNC action 发起时被 watchIncrementAsync 动态启动。
- 使用 Saga 辅助函数
第一个函数，takeEvery 是最常见的，它提供了类似 redux-thunk 的行为。
import { takeEvery } from 'redux-saga'

function* watchFetchData() {
  yield* takeEvery('FETCH_REQUESTED', fetchData)
}
takeEvery 允许多个 fetchData 实例同时启动。在某个特定时刻，我们可以启动一个新的 fetchData 任务， 尽管之前还有一个或多个 fetchData 尚未结束。
如果我们只想得到最新那个请求的响应（例如，始终显示最新版本的数据）。我们可以使用 takeLatest 辅助函数。
import { takeLatest } from 'redux-saga'

function* watchFetchData() {
  yield* takeLatest('FETCH_REQUESTED', fetchData)
}
和 takeEvery 不同，在任何时刻 takeLatest 只允许执行一个 fetchData 任务。并且这个任务是最后被启动的那个。 如果之前已经有一个任务在执行，那之前的这个任务会自动被取消。
- 声明式 Effects
在 redux-saga 的世界里，Sagas 都用 Generator 函数实现。我们从 Generator 里 yield 纯 JavaScript 对象以表达 Saga 逻辑。 我们称呼那些对象为 Effect。Effect 是一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。 你可以把 Effect 看作是发送给 middleware 的指令以执行某些操作（调用某些异步函数，发起一个 action 到 store）。
你可以使用 redux-saga/effects 包里提供的函数来创建 Effect。
- 发起 action 到 store
redux-saga 为此提供了另外一个函数 put，这个函数用于创建 dispatch Effect。
import { call, put } from 'redux-saga/effects'
//...

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // 创建并 yield 一个 dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}
-错误处理
可以使用熟悉的 try/catch 语法在 Saga 中捕获错误。
import Api from './path/to/api'
import { call, put } from 'redux-saga/effects'

//...

function* fetchProducts() {
  try {
    const products = yield call(Api.fetch, '/products')
    yield put({ type: 'PRODUCTS_RECEIVED', products })
  }
  catch(error) {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}
当然了，你并不一定得在 try/catch 区块中处理错误，你也可以让你的 API 服务返回一个正常的含有错误标识的值。例如， 你可以捕捉 Promise 的拒绝操作，并将它们映射到一个错误字段对象。
import Api from './path/to/api'
import { take, put } from 'redux-saga/effects'

function fetchProductsApi() {
  return Api.fetch('/products')
    .then(response => {response})
    .catch(error => {error})
}

function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi)
  if(response)
    yield put({ type: 'PRODUCTS_RECEIVED', products: response })
  else
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
}
 - 监听未来的 action
   take 让我们通过全面控制 action 观察进程来构建复杂的控制流成为可能
   take 就像我们更早之前看到的 call 和 put。它创建另一个命令对象，告诉 middleware 等待一个特定的 action。 正如在 call Effect 的情况中，middleware 会暂停 Generator，直到返回的 Promise 被 resolve。 在 take 的情况中，它将会暂停 Generator 直到一个匹配的 action 被发起了
   使用 take 组织代码有一个小问题。在 takeEvery 的情况中，被调用的任务无法控制何时被调用， 它们将在每次 action 被匹配时一遍又一遍地被调用。并且它们也无法控制何时停止监听。
   而在 take 的情况中，控制恰恰相反。与 action 被 推向（pushed） 任务处理函数不同，Saga 是自己主动 拉取（pulling） action 的。 看起来就像是 Saga 在执行一个普通的函数调用 action = getNextAction()，这个函数将在 action 被发起时 resolve。
   这样的反向控制让我们能够实现一些使用传统的 push 方法做非常规事情的控制流。
   主动拉取 action 的另一个好处是我们可以使用熟悉的同步风格来描述我们的控制流。举个例子，假设我们希望实现一个这样的登录控制流，有两个 action 分别是 LOGIN 和 LOGOUT。 使用 takeEvery（或 redux-thunk）我们必须要写两个分别的任务（或 thunks）：一个用于 LOGIN，另一个用于 LOGOUT。
   结果就是我们的逻辑现在分开在两个地方了。别人为了阅读我们的代码搞明白这是怎么回事，他必须阅读两个处理函数的源代码并且要在两处逻辑之间建立连接。 这意味着他必须通过在心中重新排列放在几个不同地方的代码逻辑获得正确的排序，从而在脑中重建控制流模型。
   使用拉取（pull）模式，我们可以在同一个地方写控制流。
   function* loginFlow() {
     while(true) {
       yield take('LOGIN')
       // ... perform the login logic
       yield take('LOGOUT')
       // ... perform the logout logic
     }
   }

 - 为了表示无阻塞调用，redux-saga 提供了另一个 Effect：fork。 当我们 fork 一个 任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束。
 import { take, put, call, fork, cancel } from 'redux-saga/effects'

 // ...

 function* loginFlow() {
   while(true) {
     const {user, password} = yield take('LOGIN_REQUEST')
     // fork return a Task object
     const task = yield fork(authorize, user, password)
     const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
     if(action.type === 'LOGOUT')
       yield cancel(task)
     yield call(Api.clearItem('token'))
   }
 }
 - 为了取消 fork 任务，我们可以使用一个指定的 Effect cancel
 import { isCancelError } from 'redux-saga'
 import { take, call, put } from 'redux-saga/effects'
 import Api from '...'

 function* authorize(user, password) {
   try {
     const token = yield call(Api.authorize, user, password)
     yield put({type: 'LOGIN_SUCCESS', token})
     return token
   } catch(error) {
     if(!isCancelError(error))
       yield put({type: 'LOGIN_ERROR', error})
   }
 }
 - 当我们需要 yield 一个包含 effects 的数组， generator 会被阻塞直到所有的 effects 都执行完毕，或者当一个 effect 被拒绝 （就像 Promise.all 的行为）。

 import { call } from 'redux-saga/effects'
  // 正确写法, effects 将会同步执行
 const [users, repos] = yield [
   call(fetch, '/users'),
   call(fetch, '/repos')
 ]
 - 在多个 Effects 之间启动 race
 有时候我们同时启动多个任务，但又不想等待所有任务完成，我们只希望拿到 胜利者：即第一个被 resolve（或 reject）的任务。 race Effect 提供了一个方法，在多个 Effects 之间触发一个竞赛（race）。
 race 的另一个有用的功能是，它会自动取消那些失败的 Effects。
 第一个用于在后台启动一个任务，这个任务运行在一个无限循环的 while(true) 中（例如：每 x 秒钟从服务器上同步一些数据）
 一旦该后台任务启动了，我们启用第二个按钮，这个按钮用于取消该任务。
 import { race, take, put } from 'redux-saga/effects'

 function* backgroundTask() {
   while(true) { ... }
 }

 function* watchStartBackgroundTask() {
   while(true) {
     yield take('START_BACKGROUND_TASK')
     yield race({
       task: call(backgroundTask),
       cancel: take('CANCEL_TASK')
     })
   }
 }
 在 CANCEL_TASK action 被发起的情况下，race Effect 将自动取消 backgroundTask，并在 backgroundTask 中抛出一个取消错误。
 - 任务的取消
 一旦任务被 fork，可以使用 yield cancel(task) 来中止任务执行。取消正在运行的任务，将抛出 SagaCancellationException 错误。

- 名词解释
这是 Redux Saga 核心的术语词汇表。
Effect
一个 effect 就是一个纯文本 JavaScript 对象，包含一些将被 saga middleware 执行的指令。
使用 redux-saga 提供的工厂函数来创建 effect。 举个例子，你可以使用 call(myfunc, 'arg1', 'arg2') 指示 middleware 调用 myfunc('arg1', 'arg2') 并将结果返回给 yield 了 effect 的那个 Generator。
Task
一个 task 就像是一个在后台运行的进程。在基于 redux-saga 的应用程序中，可以同时运行多个 task。通过 fork 函数来创建 task：
function* saga() {
  ...
  const task = yield fork(otherSaga, ...args)
  ...
}
阻塞调用/非阻塞调用
阻塞调用的意思是，Saga yield 了 Effect 后会等待其执行结果返回，结果返回后才会恢复执行 Generator 中的下一个指令。
非阻塞调用的意思是，Saga 会在 yield Effect 之后立即恢复执行。
示例：
function* saga() {
  yield take(ACTION)              // 阻塞: 将等待 action
  yield call(ApiFn, ...args)      // 阻塞: 将等待 ApiFn (如果 ApiFn 返回一个 Promise 的话)
  yield call(otherSaga, ...args)  // 阻塞: 将等待 otherSaga 结束

  yied put(...)                   // 阻塞: 将同步发起 action (使用 Promise.then)

  const task = yield fork(otherSaga, ...args)  // 非阻塞: 将不会等待 otherSaga
  yield cancel(task)                           // 非阻塞: 将立即恢复执行
  // or
  yield join(task)                             // 阻塞: 将等待 task 结束
}
Watcher/Worker
指的是一种使用两个单独的 Saga 来组织控制流的方式。
Watcher: 监听发起的 action 并在每次接收到 action 时 fork 一个 worker。
Worker: 处理 action 并结束它。
示例：
function* watcher() {
  while(true) {
    const action = yield take(ACTION)
    yield fork(worker, action.payload)
  }
}

function* worker(payload) {
  // ... do some stuff
}

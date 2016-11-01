# SharpReact
#Notes
  [Notes (文章/笔记)](Documentation/basic/notes.md)
#Content

#Screens

#Summary

#Technologies
The following are brief descriptions of the technologies used
##Views
###[React](https://facebook.github.io/react)
A declarative, efficient, and flexible JavaScript library for building user interfaces.


##Models

###[Redux](https://github.com/reactjs/redux)
Predictable state container for JavaScript apps;

Redux 中文文档<http://cn.redux.js.org/>

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。
可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供 超爽的开发体验，比如有一个时间旅行调试器可以编辑后实时预览。
Redux 除了和 React 一起用外，还支持其它界面库。
它体小精悍（只有2kB）且没有任何依赖。
###[React-Redux](https://github.com/reactjs/react-redux )
Official React bindings for Redux

###[Redux-saga](https://github.com/yelouafi/redux-saga)
An alternative side effect model for Redux apps

Redux-saga 中文文档 <http://leonshi.com/redux-saga-in-chinese/>

redux-saga 是一个用于管理 Redux 应用异步操作（Side Effects。译注：直译成 “副作用” 不太通顺，所以这里译为 “异步操作” 更好理解）的中间件（又称异步 action）。 redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件。
###[reselect](https://github.com/reactjs/reselect)
Selector library for Redux ;
Simple “selector” library for Redux inspired by getters in NuclearJS, subscriptions in re-frame and this proposal from speedskater.

store 的 select 方案，用于提取数据的筛选逻辑，让 Component 保持简单。选 reselct 看重的是 可组合特性 和 缓存机制 。

##[dva](https://github.com/dvajs/dva)
React and redux based, lightweight and elm-style framework. (Inspired by choo)

dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。( Inspired by elm and choo. )
dva 是 framework，不是 library，类似 emberjs，会很明确地告诉你每个部件应该怎么写，这对于团队而言，会更可控。另外，除了 react 和 react-dom 是 peerDependencies 以外，dva 封装了所有其他依赖。

##Router
###[react-router](https://github.com/ReactTraining/react-router)
Declarative routing for React ;
React Router is a complete routing library for React.
React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. Make the URL your first thought, not an after-thought.

##Networking

### [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
Isomorphic WHATWG Fetch API, for Node & Browserify.Built on top of GitHub's WHATWG Fetch polyfill.

isomorphic-fetch: 便于在同构应用中使用，另外同时要写 node 和 web 的同学可以用一个库，学一套 api 。
然后通过 async + await 组织代码。

GitHub's WHATWG
A window.fetch JavaScript polyfill. http://github.github.io/fetch/
<https://github.com/github/fetch>

##Universal Javascript
###[react-helmet](https://github.com/nfl/react-helmet)
A document head manager for React

## UI/UX
###[Ant Design](https://ant.design/)
 One design language  一个 UI 设计语言

 An enterprise-class UI design language and React-based implementation.

 这里是 Ant Design 的 React 实现，开发和服务于企业级后台产品。


Features
An enterprise-class design language and high quality UI.
Graceful UI components out of the box, base on React Component.
Writen in TypeScript with complete define types.
A npm + webpack + babel + dora + dva development framework.

特性#
Designed as Ant Design，提炼和服务企业级中后台产品的交互语言和视觉风格。
React Component 基础上精心封装的高质量 UI 组件。
基于 npm + webpack + babel 的工作流，支持 ES2015 和 TypeScript。
###[css-modules](https://github.com/css-modules/css-modules )

Documentation about css-modules
css-modules: 配合 webpack 的 css-loader 进行打包，会为所有的 class name 和 animation name 加 local scope，避免潜在冲突。

##Testing


/*       */

//import React from 'react';
import React, {Component, PropTypes} from 'react';
import {Match, Miss} from 'react-router';
import Helmet from 'react-helmet';
import {take, put, call, fork, select} from 'redux-saga/effects';
import {CodeSplit} from 'code-split-component';

//import 'normalize.css/normalize.css';
import {getAsyncInjectors} from '../utils/asyncInjectors';
import storeShape from '../utils/storeShape'
import './globals.css';
import Error404 from './Error404';
import Header from './Header';
import MatchWithUser from '../modules/github/router'
import MatchWithTest from '../modules/Test/router'
//import UserPage1 from './UserPage';
//import Example from './Example';
import {WEBSITE_TITLE, WEBSITE_DESCRIPTION} from '../constants';

//define router render function

const MatchWithFade = ({store, ...rest}) => {
  return (
    <Match {...rest} render={userRouterRender(store)}/>
  )
};
const userRouterRender = (store) => {
  const {injectReducer, injectSagas} = getAsyncInjectors(store);
  return function (routerProps) {
    return (
      <CodeSplit chunkName="user" modules={
      {
        User: require('./UserPage'),
        reducer: require('../modules/github/reducers'),
        sagas: require('../modules/github/sagas'),
        selectors: require('../modules/github/selectors'),
        actions: require('../modules/github/actions'),
        alls: require('../modules/github'),
      }
      }>
        { ({User, reducer, sagas, alls}) => {

          if (!User) return <div />;
          {/*//must be provider last line !!! or a <Loading /> component See code-split-component Docs*/
          }
          injectReducer('entities', reducer.entities);
          injectReducer('pagination', reducer.pagination);
          injectReducer('errorMessage', reducer.errorMessage);
          injectReducer('router', reducer.router);
          //saga must by []
          injectSagas(sagas);
          // return <div /> ;
          return User && <User {...routerProps} />
        } }
      </CodeSplit>
    )
  }

};

class App extends Component {
  getChildContext() {
    return {store: this.store}
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  render() {
    const {injectReducer, injectSagas} = getAsyncInjectors(this.store);
    return (
      <div style={{padding: '10px'}}>
        {/*
         All of the following will be injected into our page header.
         @see https://github.com/nfl/react-helmet
         */}
        <Helmet
          htmlAttributes={{lang: 'en'}}
          titleTemplate={`${WEBSITE_TITLE} - %s`}
          defaultTitle={WEBSITE_TITLE}
          meta={[
            {name: 'description', content: WEBSITE_DESCRIPTION},
            // Default content encoding.
            {name: 'charset', content: 'utf-8'},
            // @see http://bit.ly/2f8IaqJ
            {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
            // This is important to signify your application is mobile responsive!
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            // Providing a theme color is good if you are doing a progressive
            // web application.
            {name: 'theme-color', content: '#2b2b2b'},
          ]}
          link={[
            // When building a progressive web application you need to supply
            // a manifest.json as well as a variety of icon types. This can be
            // tricky. Luckily there is a service to help you with this.
            // http://realfavicongenerator.net/
            {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
            {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32'},
//          { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
            {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#00a9d9'},
            // Make sure you update your manifest.json to match your application.
            {rel: 'manifest', href: '/manifest.json'},
          ]}
          script={[]}
        />

        <Header />

        <Match
          exactly
          pattern="/"
          render={routerProps =>
            <CodeSplit chunkName="home" modules={{Home: require('./Home')}}>
              { ({Home}) => Home && <Home {...routerProps} /> }
            </CodeSplit>
          }
        />
        <Match
          pattern="/about"
          render={routerProps =>
            <CodeSplit chunkName="about" modules={{About: require('./About')}}>
              { ({About}) => {
                if (!About) return <div />;
                return About && <About {...routerProps} /> }}
            </CodeSplit>
          }
        />
        <Match
          exactly
          pattern="/example"
          render={routerProps =>
            <CodeSplit chunkName="example" modules={
            {
              Example: require('./Example'),
              reducer: require('../modules/Example/reducer'),
              sagas: require('../modules/Example/sagas')
            }
            }>
              { ({Example, reducer, sagas}) => {
                if (!Example) return <div />; //this line can protect
                console.log('exampleRouterRender',reducer);
                injectReducer('example', reducer);
                injectSagas(sagas);
                return Example && <Example {...routerProps} />
              }
              }
            </CodeSplit>
          }
        />

        <Match
          pattern="/posts"
          render={routerProps =>
            <CodeSplit chunkName="posts" modules={
            {
              Posts: require('./Posts'),
              reducer: require('../modules/posts/reducers')
            }
            }>
              { ({Posts, reducer}) => {
                if (!Posts) return <div />;
                injectReducer('posts', reducer);
                return Posts && <Posts {...routerProps} />
              }
              }

            </CodeSplit>
          }
        />


        {/*<Match*/}
        {/*pattern="/user/:login"*/}
        {/*render={routerProps =>*/}
        {/*<CodeSplit chunkName="user" modules={{ GitHub: require('../modules/github/routerImport') }}>*/}
        {/*{ ({ GitHub }) => {*/}
        {/*console.log(GitHub);*/}
        {/*const { User, reducers, sagas }= GitHub;*/}
        {/*console.log('reducer:',reducers);*/}
        {/*console.log('sagas:',sagas);*/}
        {/*//console.log('all',alls);*/}
        {/*console.log('User',User);*/}
        {/*injectReducer('entities', reducers.entities);*/}
        {/*injectReducer('pagination', reducers.pagination);*/}
        {/*injectReducer('errorMessage', reducers.errorMessage);*/}
        {/*injectReducer('router', reducers.router);*/}
        {/*//injectReducer('user', reducer.default);*/}
        {/*//injectSagas(sagas.default);*/}
        {/*injectSagas(sagas);*/}
        {/*// return <div /> ;*/}
        {/*return User && <User {...routerProps} />*/}
        {/*}*/}
        {/*}*/}
        {/*</CodeSplit>*/}
        {/*}*/}
        {/*/>*/}

        {/*<MatchWithFade*/}
          {/*exactly*/}
          {/*pattern="/user/:login"*/}
          {/*store={this.store}*/}
        {/*/>*/}
        <MatchWithUser
          exactly
          pattern="/user/:login"
          store={this.store}
        />
        <MatchWithTest
          exactly
          pattern="/test"
          store={this.store}
        />
        <Miss component={Error404}/>
      </div>
    );
  }
}

//
// function App() {
//   return (
//     <div style={{ padding: '10px' }}>
//       {/*
//         All of the following will be injected into our page header.
//         @see https://github.com/nfl/react-helmet
//       */}
//       <Helmet
//         htmlAttributes={{ lang: 'en' }}
//         titleTemplate={`${WEBSITE_TITLE} - %s`}
//         defaultTitle={WEBSITE_TITLE}
//         meta={[
//           { name: 'description', content: WEBSITE_DESCRIPTION },
//           // Default content encoding.
//           { name: 'charset', content: 'utf-8' },
//           // @see http://bit.ly/2f8IaqJ
//           { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
//           // This is important to signify your application is mobile responsive!
//           { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//           // Providing a theme color is good if you are doing a progressive
//           // web application.
//           { name: 'theme-color', content: '#2b2b2b' },
//         ]}
//         link={[
//           // When building a progressive web application you need to supply
//           // a manifest.json as well as a variety of icon types. This can be
//           // tricky. Luckily there is a service to help you with this.
//           // http://realfavicongenerator.net/
//           { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
//           { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
// //          { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
//           { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#00a9d9' },
//           // Make sure you update your manifest.json to match your application.
//           { rel: 'manifest', href: '/manifest.json' },
//         ]}
//         script={[]}
//       />
//
//       <Header />
//
//       <Match
//         exactly
//         pattern="/"
//         render={routerProps =>
//           <CodeSplit chunkName="home" modules={{ Home: require('./Home') }}>
//             { ({ Home }) => Home && <Home {...routerProps} /> }
//           </CodeSplit>
//         }
//       />
//
//       <Match
//         exactly
//         pattern="/example"
//         render={routerProps =>
//           <CodeSplit chunkName="example" modules={{ Example: require('./Example') }}>
//             { ({ Example }) => Example && <Example {...routerProps} /> }
//           </CodeSplit>
//         }
//       />
//
//       <Match
//         pattern="/posts"
//         render={routerProps =>
//           <CodeSplit chunkName="posts" modules={{ Posts: require('./Posts') }}>
//             { ({ Posts }) => Posts && <Posts {...routerProps} /> }
//           </CodeSplit>
//         }
//       />
//
//       <Match
//         pattern="/about"
//         render={routerProps =>
//           <CodeSplit chunkName="about" modules={{ About: require('./About') }}>
//             { ({ About }) => About && <About {...routerProps} /> }
//           </CodeSplit>
//         }
//       />
//       <Match
//         exactly
//         pattern="/user/:login"
//         render={routerProps =>
//           <CodeSplit chunkName="user"  modules={{ User: require('./UserPage') }}>
//             { ({ User }) => User && <User {...routerProps} /> }
//           </CodeSplit>
//         }
//       />
//       <Miss component={Error404} />
//     </div>
//   );
// }
App.propTypes = {
  store: storeShape.isRequired
};
App.childContextTypes = {
  store: storeShape.isRequired
};
export default App;

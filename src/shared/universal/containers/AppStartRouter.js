/**
 * Created by chengdi on 2016/12/10.
 */

import React, {Component, PropTypes} from 'react';
import {Match, Miss} from 'react-router';
import {CodeSplit} from 'code-split-component';
import MatchWithUser from '../modules/github/router'
import MatchWithTest from '../modules/Test/router'
import Error404 from './Error404';
import {getAsyncInjectors} from '../utils/asyncInjectors';

class AppRouter extends Component {

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  render() {
    const {injectReducer, injectSagas} = getAsyncInjectors(this.store);
    return (
      <div>
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
                return About && <About {...routerProps} />
              }}
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
                console.log('exampleRouterRender', reducer);
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
    )
  }
}

  export  default  AppRouter;

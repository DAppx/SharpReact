
//define router render function
import React from 'react';
import {Match, Miss} from 'react-router';
import {CodeSplit} from 'code-split-component';
import {getAsyncInjectors} from '../../utils/asyncInjectors';

const MatchWithUser = ({store, ...rest}) => {
  return (
    <Match {...rest} render={userRouterRender(store)} />
  )
};
const userRouterRender = (store) => {
  const {injectReducer, injectSagas} = getAsyncInjectors(store);
  return function (routerProps) {
    return (
      <CodeSplit chunkName="user" modules={
      {
        modules: require('../github'),
      }
      }>
        { ({ modules }) => {

          if (!modules) return <div />;
          console.log('userRouterRender',modules);
          injectReducer('entities', modules.reducers.entities);
          injectReducer('pagination', modules.reducers.pagination);
          injectReducer('errorMessage', modules.reducers.errorMessage);
          injectReducer('router', modules.reducers.router);
          //saga must by []
          injectSagas(modules.sagas);
          const { Page }= modules ;
          // return <div /> ;
          return Page && <Page {...routerProps} />
        } }
      </CodeSplit>
    )
  }

};
export default MatchWithUser;

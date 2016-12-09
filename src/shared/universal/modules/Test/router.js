/*
*
* Test Router Render
*
*/

import React from 'react';
import {Match, Miss} from 'react-router';
import {CodeSplit} from 'code-split-component';
import {getAsyncInjectors} from '../../utils/asyncInjectors';

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




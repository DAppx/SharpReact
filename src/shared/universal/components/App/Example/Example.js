/**
 * Created by chengdi on 2016/11/22.
 */
import React from 'react';
import Helmet from 'react-helmet';
import Example1 from '../../../modules/Example';

function Example() {
  return (
    <article>
      <Helmet title="example" />
      <div> delete </div>
      <Example1 />
    </article>
  );
}

export default Example;

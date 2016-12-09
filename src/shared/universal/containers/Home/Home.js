/*       */

import React from 'react';
import Helmet from 'react-helmet';
import {Button} from 'antd';
// import 'antd/lib/style/css';
// import 'antd/lib/button/style/css';
import 'antd/dist/antd.less';  // or 'antd/dist/antd.less'

function Home() {
  return (
    <article>
      <Helmet title="Home" />
      <Button type="primary" size="large">AntDesign Button</Button>
      <p>
        Test AntDesign Components;

        This starter kit contains all the build tooling and configuration you
        need to kick off your next universal react project, whilst containing a
        minimal project set up allowing you to make your own architecture
        decisions (redux/Saga/Thunk etc).

      </p>
    </article>
  );
}

export default Home;

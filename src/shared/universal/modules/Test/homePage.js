/*
 *
 * Test
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectTest from './selectors';

export class Test extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Test"
          meta={[
            { name: 'description', content: 'Description of Test' },
          ]}
        />
         Test module Home Page.
      </div>
    );
  }
}

const mapStateToProps = selectTest();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);

/*       */

import React from 'react';
import { connect } from 'react-redux';
// import {Button} from 'antd';
// // import 'antd/lib/style/css';
// // import 'antd/lib/button/style/css';
// import 'antd/dist/antd.less';  // or 'antd/dist/antd.less'
//      <Button type="primary" size="large">antd button</Button>
import Logo from './Logo';
import Menu from './Menu';
import { WEBSITE_DESCRIPTION } from '../../constants';

function Header(loginState) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <Logo />

      <h2>React, Redux, React-RouterV4, Redux-Saga, Modules , AntDesign, Universally</h2>
      <strong>{WEBSITE_DESCRIPTION}</strong>

      <Menu loginState={loginState} />
    </div>
  );
}


function mapStateToProps(state,props) {
  return {
    loginState: state.get('auth').toJS() //可以替换为selector
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(viewActions, dispatch)
//   };
// }
//export default Header;
export default connect(mapStateToProps)(Header);

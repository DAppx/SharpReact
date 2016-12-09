/*       */

import React,{Component} from 'react';
import {Link} from 'react-router';

// function Menu() {
//
//   return (
//     <ul style={{ marginTop: '1rem' }}>
//       <li><Link to="/">Home</Link></li>
//       <li><Link to="/about">About</Link></li>
//       <li><Link to="/posts">React-RouterV4</Link></li>
//       <li><Link to="/example">Saga Example</Link></li>
//       <li><Link to="/User/DAppx">Saga Example2</Link></li>
//       <li><Link to="/login">login</Link></li>
//     </ul>
//   );
// }

class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    console.log('menu:props',this.props)
  }
  jsx_Login() {
    if (this.props.loginState && this.props.loginState.loggedIn)
      return  <li><Link to="/logOut">loginOut</Link></li>;
    else
      return <li><Link to="/login">login</Link></li>
  }
  render() {
    return (
      <ul style={{marginTop: '1rem'}}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/test">Test</Link></li>
        <li><Link to="/posts">React-RouterV4</Link></li>
        <li><Link to="/example">Saga Example</Link></li>
        <li><Link to="/User/DAppx">Saga Example2</Link></li>
        {this.jsx_Login()}
        {this.props.loginState && this.props.loginState.loggedIn ?  <li><Link to="/logOut">loginOut</Link></li> : <li><Link to="/login">login</Link></li>}
      </ul>
    );
  }
}
export default Menu;

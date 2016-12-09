/**
 * Created by chengdi on 2016/11/23.
 */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import UserPage from './UserPage';

function UserPage1(login) {
  console.log('UserPage1  funcion login',login);
  console.log('UserPage1  this',this);
  return (
    <article>
      <Helmet title="example" />
      <div> UserPage </div>

      <UserPage {...login} />
    </article>
  );
}
function mapStateToProps(state, props) {
  // console.log('userpage1 state',state);
  // console.log('userpage1 :mapStateToProps props',props);
  // const login= props.params.login;
  // return {
  //   login: login,
  //   extparam:'11111'
  // };
  return props;
}

export default connect(mapStateToProps)(UserPage1);


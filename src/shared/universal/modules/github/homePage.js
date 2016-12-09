/**
 * Created by chengdi on 2016/12/8.
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {createStructuredSelector} from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import zip from 'lodash/zip';
import { viewActions } from '../../modules/github/actions';
import {selectUserReducerDomain} from '../../modules/github/selectors';
import { loadUser, loadStarred } from '../../modules/github/sagas';

//export { List, User, Repo} from './App';
// import Repo from './Repo/Repo';
import List from '../../components/App/List/List';
import Repo from '../../components/App/Repo/Repo';
import User from '../../components/App/User/User';

class UserPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.renderRepo = this.renderRepo.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    // console.log('UserPage componentWillMount',this.props);
    this.props.actions.loadUserPage(this.props.params.login);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.login !== nextProps.params.login) {
      this.props.actions.loadUserPage(nextProps.params.login);
    }
  }


  handleLoadMoreClick() {
    this.props.actions.loadMoreStarred(this.props.params.login);
  }

  renderRepo([repo, owner]) {
    return (<Repo repo={repo} owner={owner} key={repo.fullName} />);
  }

  render() {

    const { user, login } = this.props.userState;
    if (!user) {
      return (<h1><i>111 Loading {login}’s profile...</i></h1>);
    }
    const { starredRepos, starredRepoOwners, starredPagination } = this.props.userState;
    return (
      <div>
        <User user={user} />
        <hr />
        <List
          renderItem={this.renderRepo}
          items={zip(starredRepos, starredRepoOwners)}
          onLoadMoreClick={this.handleLoadMoreClick}
          loadingLabel={`Loading ${login}’s starred...`}
          {...starredPagination}
        />
      </div>
    );
  }
}

UserPage.propTypes = {
  userState: React.PropTypes.object
  // login: PropTypes.string.isRequired,
  // user: PropTypes.object,
  // actions: PropTypes.shape({
  //   loadUserPage: PropTypes.func.isRequired,
  //   loadMoreStarred: PropTypes.func.isRequired
  // }),
  // starredPagination: PropTypes.object,
  // starredRepos: PropTypes.array.isRequired,
  // starredRepoOwners: PropTypes.array.isRequired
};

function preload({ login }) {
  return [
    [loadUser, login, []],
    [loadStarred, login]
  ];
}
UserPage.preload = preload;

// function mapStateToProps(state) {
//    console.log('mapStateToProps:userPage',state);
//    const  login='DAppx';
//   //const { login } = state.router.params;
//   const starredByUser=state.get('pagination').get('starredByUser') ;
//   const users=state.get('entities').get('users') ;
//   const repos=state.get('entities').get('repos') ;
//   // const users=state.getin(['entities', 'users']);
//   // const repos=state.getin(['entities', 'repos']);
//   const user=users.get('DAppx');
//   console.log('user:info---',user);
//   console.log('users',users);
//   console.log('starredByUser:info',starredByUser);
//   // const {
//   //   pagination: { starredByUser },
//   //   entities: { users, repos }
//   // } = state;
//
//   const starredPagination = starredByUser[login] || { ids: [] };
//   const starredRepos = starredPagination.ids.map(id => repos[id]);
//   const starredRepoOwners = starredRepos.map(repo => users.get(repo.owner));
//  // const starredRepoOwners =[];
//
//   return {
//     login,
//     starredRepos,
//     starredRepoOwners,
//     starredPagination,
//     user: user?user.toJS():user
//   };
// }
const mapStateToProps = createStructuredSelector({
  userState: selectUserReducerDomain(),
});

// function mapStateToProps(state,props) {
//   console.log('mapStateToProps :state ；userpage',state);
//   console.log(props);
//   const id= props.params.id;
//   return {
//     post: 1,
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(viewActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

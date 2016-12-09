import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
export const getUser = (state, login) => state.get('entities').get('users').get(login);
export const getRepo = (state, fullName) => state.get('entities').get('repos').get(fullName);
export const getStarredByUser = (state, login) => state.get('pagination').get('starredByUser').get(login) || fromJS({});

// eslint-disable-next-line
export const getStargazersByRepo = (state, fullName) => state.get('pagination').get('stargazersByRepo').get(fullName) || fromJS({});


// export const getUser = (state, login) => state.entities.users[login];
// export const getRepo = (state, fullName) => state.entities.repos[fullName];
// export const getStarredByUser = (state, login) => state.pagination.starredByUser[login] || {};
//
// // eslint-disable-next-line
// export const getStargazersByRepo = (state, fullName) => state.pagination.stargazersByRepo[fullName] || {};


// use immutable.js
export const selectRouterParamsReducer = (state, props) => {
  return props.params.login;
};
export const selectEntitiesReducer = () => state => state.get('entities');
export const selectPaginationReducer = () => state => state.get('pagination');
export const selectUserReducer = (Entities, Pagination) => (Entities, Pagination) => Entities.merge(Pagination);

export const selectUserReducerDomain = () => createSelector(
  [selectRouterParamsReducer,selectEntitiesReducer(), selectPaginationReducer()],
  (Params, Entities, Pagination) => {
    const  login=Params;
    const starredByUser= Pagination.get('starredByUser') ;
    const users= Entities.get('users') ;
    const repos= Entities.get('repos') ;
    const user= users.get(login);
    const starredPagination = starredByUser.get(login) || fromJS({ ids: [] });
    const starredRepos = starredPagination.get('ids').map(id => {
      return repos.get(id)
    });
    const starredRepoOwners = starredRepos.map(repo => {
      return users.get(repo.get('owner'))
    } );
    return {
      login,
      starredRepos:starredRepos.toJS(),
      starredRepoOwners:starredRepoOwners.toJS(),
      starredPagination:starredPagination.toJS(),
      user: user?user.toJS():user
    };

  }  //

);

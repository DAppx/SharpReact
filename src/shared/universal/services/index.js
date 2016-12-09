import {browserHistory} from 'react-router';
import * as _apiGitHub from './githubApi';

// import withScroll from 'scroll-behavior';
export const apiGitHub = _apiGitHub;
// export const history = withScroll(browserHistory);
export const history = browserHistory;

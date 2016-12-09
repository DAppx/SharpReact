import axios from 'axios';
import fetch from '../core/fetch';

// function createGraphqlRequest(fetchKnowingCookie) {
//   return async function graphqlRequest(query, variables) {
//     const fetchConfig = {
//       method: 'post',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ query, variables }),
//       credentials: 'include',
//     };
//     const resp = await fetchKnowingCookie('/graphql', fetchConfig);
//     if (resp.status !== 200) throw new Error(resp.statusText);
//     return await resp.json();
//   };
// }

function createFetchKnowingCookie({cookie}) {
  if (!process.env.BROWSER) {
    return (url, options = {}) => {
      const isLocalUrl = /^\/($|[^/])/.test(url);

      // pass cookie only for itself.
      // We can't know cookies for other sites BTW
      if (isLocalUrl && options.credentials === 'include') {
        const headers = {
          ...options.headers,
          cookie,
        };
        return fetch(url, {...options, headers});
      }

      return fetch(url, options);
    };
  }

  return fetch;
}

// NOTE: If we create an '/api' endpoint in our application then we will neeed to
// configure the axios instances so that they will resolve to the proper URL
// endpoints on the server. We have to provide absolute URLs for any of our
// server bundles. To do so we can set the default 'baseURL' for axios. Any
// relative path requests will then be appended to the 'baseURL' in order to
// form an absolute URL.
// We don't need to worry about this for client side executions, relative paths
// will work fine there.
// Example:
//
// const axiosConfig = process.env.IS_NODE === true
//   ? { baseURL: process.env.NOW_URL || notEmpty(process.env.SERVER_URL) }
//   : {};
//
// Then we will then have to initialise our redux-thunk middlware like so:
//
// thunk.withExtraArgument({
//   axios: axios.create(axiosConfig),
// })

export default function createHelpers(config) {
  const fetchKnowingCookie = createFetchKnowingCookie(config);
//  const graphqlRequest = createGraphqlRequest(fetchKnowingCookie);

  return {
    fetch: fetchKnowingCookie,
    axios
  };
}

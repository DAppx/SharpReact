/*       */
/* eslint-disable import/prefer-default-export */


function fetching(id) {
  return { type: 'FETCHING_M_POST', payload: id };
}

function fetched(post) {
  console.log('fetched(post)',post);
  return { type: 'FETCHED_M_POST', payload: post };
}

export function fetch(id) {
  return (dispatch, getState, helpers) => {
    fetching(id);
    console.log(helpers);
    return helpers.axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(({ data }) => dispatch(fetched(data)));
  };
}

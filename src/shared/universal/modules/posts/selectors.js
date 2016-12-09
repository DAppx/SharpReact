/**
 * Created by chengdi on 2016/11/23.
 */

// -----------------------------------------------------------------------------
// EXPORTED SELECTORS

export function getAll(state) {
  return state;
}

// -----------------------------------------------------------------------------
// EXPORTED SELECTORS

// var obj = { 1: "one" };
// Object.keys(obj); // [ "1" ]
// obj["1"]; // "one"
// obj[1];   // "one"
//
// var map = Map(obj);
// map.get("1"); // "one"
// map.get(1);   // undefined

export function getById(state, id) {
  const ids= 'u:'+id;  //use id Map 中 get(id) = undefined ????? 以后研究一下  ('1' or 1  no no no)
  return state.get(ids);
}

// -----------------------------------------------------------------------------
// EXPORTED SELECTORS

export function posts_getById(state, id) {
  return getById(state.get('byId'), id);
}

export function posts_getAll(state) {
  return getAll(state.all)
    .map(id => getById(state, id));
}

// -----------------------------------------------------------------------------
// EXPORTED SELECTORS

export function getPostById(state, id) {
  return posts_getById(state.get('posts'), id);
}

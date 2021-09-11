import { createStore } from "redux";

import RouteReducers from './reducers/index';

const store = createStore(
  RouteReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
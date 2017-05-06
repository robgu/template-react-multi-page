import * as redux from 'react-redux';

import { ConnectedRouter, push, routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux';

import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

export const history = createHistory()

const finalCreateStore = compose(
  applyMiddleware(routerMiddleware(history)),
  applyMiddleware(thunk),
  applyMiddleware(createLogger())
)(createStore);

const store = finalCreateStore(rootReducer);
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    // eslint-disable-next-line global-require
    const nextReducer = require('./reducer');
    store.replaceReducer(nextReducer);
  });
}

export const connect = (...args) => {
  const getProps = args[0]

  args[0]=()=> {
    const props = getProps();
    props.i18n = 'null';
    props.dispatch = store.dispatch;
    return props;
  };

  return redux.connect(...args);
}

export default store;

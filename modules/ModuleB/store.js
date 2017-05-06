import { applyMiddleware, compose, createStore } from 'redux';

import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import { reduxReactRouter } from 'react-router-redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ createHistory }),
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

export default store;

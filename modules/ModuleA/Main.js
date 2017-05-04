import { IndexRedirect, IndexRoute, Route } from 'react-router';
import React, { Component } from 'react';

import PageA from './PageA';
import PageB from './PageB';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import store from './store';

export default class Main extends Component {
  render = () => {
    return (
       <Provider store={store}>
        <ReduxRouter >
          <Route path="/moduleA">
            <Route path="pageA"  component={PageA} />
            <Route path="pageB" component={PageB} />
          </Route>
        </ReduxRouter>
      </Provider>
    );
  }
}

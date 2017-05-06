import { IndexRedirect, IndexRoute, Route } from 'react-router';
import React, { Component } from 'react';
import store, { history } from './store';

import { ConnectedRouter } from 'react-router-redux'
import PageA from './PageA';
import PageB from './PageB';
import { Provider } from 'react-redux';

export default class Main extends Component {

  render = () => {
    return (
       <Provider store={store}>
        <ConnectedRouter a={3} history={history}>
          <div>
            <Route a={1} path="/moduleA/pageA" component={PageA} />
            <Route a={2} path="/moduleA/pageB" component={PageB} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

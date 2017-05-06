import { IndexRedirect, IndexRoute, Route } from 'react-router';
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { ReduxRouter } from 'react-router-redux';

export default class PageA extends Component {
  render = () => {
    return (
       <div>
        moduleB-pageB
      </div>
    );
  }
}

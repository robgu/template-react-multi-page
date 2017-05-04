import { IndexRedirect, IndexRoute, Route } from 'react-router';
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

export default class PageA extends Component {
  render = () => {
    return (
       <div>
        moduleA-pageB
      </div>
    );
  }
}

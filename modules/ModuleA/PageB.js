import { IndexRedirect, IndexRoute, Route } from 'react-router';
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { connect } from './store';
import { push } from 'react-router-redux';

@connect(
  () => {
    return {};
  },
  {
    push
  }
)
export default class PageB extends Component {
  render = () => {
    console.warn(this.props)
    return (
       <div>
        moduleA-pageB
      </div>
    );
  }
}

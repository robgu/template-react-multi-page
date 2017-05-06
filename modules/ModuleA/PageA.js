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
export default class PageA extends Component {

  _onClick = ()=> {
    this.props.push({
      pathname: '/moduleA/pageB',
      state: {abc: 123}
    });
  }

  render = () => {
    return (
       <div onClick={this._onClick}>
        moduleA-pageA
      </div>
    );
  }
}

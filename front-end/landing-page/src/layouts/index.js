import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import Header from './Nav0';
import Footer from './Footer0';

import {
  Nav00DataSource,
  Footer00DataSource,
} from './data.source.js';

let isMobile;
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }

  render() {
    return (
      <>
        <Header dataSource={Nav00DataSource} isMobile={this.state.isMobile} />
        {this.props.children}
        {/* <Footer dataSource={Footer00DataSource} isMobile={this.state.isMobile} /> */}
      </>
    );
  }
}

export default Layout;
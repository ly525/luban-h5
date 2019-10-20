import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import { Button, Icon } from 'antd';
import BannerImage from './BannerImage';

const ButtonGroup = Button.Group;

const LubanIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1455736_n0ivu1iicd.js',
});

class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }
  static defaultProps = {
    className: 'home-banner',
  }
  render() {
    const { className } = this.props;
    return (
      <div className={`home-layout-wrapper ${className}`}>
        <div className="home-layout">
          <QueueAnim className={`${className}-content-wrapper`} delay={300} ease="easeOutQuart">
            <h1 key="h1">
              Minimalist production, a key presentation
            </h1>
            <p key="p">An mobile page builder&generator with easy drag&drop editing features</p>
            <span key="button">
              <Button
                type="primary"
                onClick={() => {
                  window.open('https://api.luban-h5.wxjcart.com/main')
                }}
              >
                Start Using
              </Button>
            </span>
            <span key="button2">
            <ButtonGroup>
              <Button type="link" size="small" title="Gitee" onClick={() => {
                window.open("https://gitee.com/ly525/luban-h5");
              }}><LubanIcon type="iconmayun"/></Button>
              <Button type="link" size="small"  title="GitHub" onClick={() => {
                window.open('https://github.com/ly525/luban-h5');
              }}><img alt="GitHub stars" src="https://img.shields.io/github/stars/ly525/luban-h5?style=social" /></Button>
            </ButtonGroup>
            </span>
          </QueueAnim>
          <div className={`${className}-image-wrapper`}>
            <BannerImage />
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;

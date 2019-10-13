import React from 'react';
import { findDOMNode } from 'react-dom';
import TweenOne from 'rc-tween-one';
import { Menu, Popover, Icon } from 'antd';
import NavLink from 'umi/navlink';

const Item = Menu.Item;
const { SubMenu } = Menu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      menuHeight: 0,
    };
  }

  phoneClick = () => {
    const menu = findDOMNode(this.menu);
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
      menuHeight: phoneOpen ? menu.scrollHeight : 0,
    });
  };

  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    const { menuHeight, phoneOpen } = this.state;
    const navData = dataSource.Menu.children;
    const navChildren = Object.keys(navData).map((key, i) => (
      <Item key={i.toString()} {...navData[key]}>
        <NavLink
          {...navData[key].a}
          href={navData[key].a.href}
          to={navData[key].a.href}
          target={navData[key].a.target}
        >
          {navData[key].a.children}
        </NavLink>
      </Item>
    ));
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            {...dataSource.logo}
          >
            {/* <img width="100%" src={dataSource.logo.children} alt="img" /> */}
            <h1>
              <a href="">Luban H5</a>
            </h1>
          </TweenOne>
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            {...dataSource.logo}
          >
            <span style={{color: 'rgba(0,0,0,.65)'}}>移动建站平台</span>
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...dataSource.Menu}
            animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            ref={(c) => {
              this.menu = c;
            }}
            style={isMobile ? { height: menuHeight } : null}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['0']}
              theme={isMobile ? 'dark' : 'default'}
            >
              {/* {navChildren} */}
              <SubMenu
                style={{color: 'black'}}
                title={
                  <span className="submenu-title-wrapper">
                    <Icon type="appstore" />
                    相关链接
                  </span>
                }
              >
                <Menu.ItemGroup title="项目地址">
                  <Menu.Item key="setting:3" onClick={() => {
                    window.open('https://api.luban-h5.wxjcart.com/main')
                  }}>Website</Menu.Item>
                  <Menu.Item key="setting:3.1" onClick={() => {
                    window.open('https://github.com/ly525/luban-h5')
                  }}>GitHub</Menu.Item>
                  <Menu.Item key="setting:4" onClick={() => {
                    window.open('https://gitee.com/ly525/luban-h5')
                  }}>Gitee</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="联系方式">
                  <Menu.Item key="setting:5.0" onClick={() => {
                    window.open('https://support.qq.com/products/93432/')
                  }}>论坛</Menu.Item>
                  <Menu.Item key="setting:5" onClick={() => {
                    window.open('https://gitee.com/ly525/luban-h5#%E4%BA%A4%E6%B5%81%E7%BE%A4')
                  }}>钉钉群</Menu.Item>
                  <Menu.Item key="setting:6" onClick={() => {
                    window.open('https://gitee.com/ly525/luban-h5#%E4%BA%A4%E6%B5%81%E7%BE%A4')
                  }}>微信群</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Document">
                  <Menu.Item key="setting:1" onClick={() => {
                    window.open('https://ly525.github.io/luban-h5/zh/')
                  }}>中文文档</Menu.Item>
                  <Menu.Item key="setting:2" onClick={() => {
                    window.open('https://ly525.github.io/luban-h5')
                  }}>English Doc</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;

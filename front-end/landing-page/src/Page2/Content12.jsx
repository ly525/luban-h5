import React from 'react';
import { Row, Col } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Content12 extends React.PureComponent {
  getChildrenToRender = data => data.map((item) => {
    return (
      <Col key={item.name} {...item}>
        <div {...item.children.wrapper}>
          <span {...item.children.img}>
            <img src={item.children.img.children} alt="img" />
          </span>
        </div>
      </Col>
    );
  });

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = this.getChildrenToRender(
      dataSource.block.children
    );
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map((item, i) => React.createElement(
              item.name.indexOf('title') === 0 ? 'h1' : 'div',
              { key: i.toString(), ...item },
              item.children.match(
                /\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/
              )
                ? React.createElement('img', {
                  src: item.children,
                  alt: 'img',
                })
                : item.children
            )
            )}
          </div>
          <OverPack
            className={`content-template ${props.className}`}
            {...dataSource.OverPack}
          >
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={{
                y: '+=30',
                opacity: 0,
                type: 'from',
                ease: 'easeOutQuad',
              }}
              leave={{ y: '+=30', opacity: 0, ease: 'easeOutQuad' }}
              {...dataSource.block}
            >
              {childrenToRender}
            </TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content12;

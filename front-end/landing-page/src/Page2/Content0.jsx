import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Content extends React.PureComponent {
  getBlockChildren = data => data.map((item, i) => {
    const children = item.children;
    return (
      <Col key={i.toString()} {...item}>
        <div {...children.icon}>
          <img src={children.icon.children} width="100%" alt="img" />
        </div>
        <h3 {...children.title}>{children.title.children}</h3>
        <p {...children.content}>{children.content.children}</p>
      </Col>
    );
  });

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const listChildren = this.getBlockChildren(dataSource.block.children);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map((item, i) => React.createElement(
              item.name.indexOf('title') === 0 ? 'h1' : 'div',
              { key: i.toString(), ...item },
              item.children.match(
                /\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/
              )
                ? React.createElement('img', {
                  src: item.children,
                  height: '100%',
                  alt: 'img',
                })
                : item.children
            )
            )}
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim
              type="bottom"
              key="block"
              leaveReverse
              {...dataSource.block}
              component={Row}
            >
              {listChildren}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content;

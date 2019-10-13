import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';

class Content13 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <OverPack {...props} {...dataSource.OverPack}>
        <QueueAnim
          type="bottom"
          leaveReverse
          key="page"
          delay={[0, 100]}
          {...dataSource.titleWrapper}
        >
          {dataSource.titleWrapper.children.map((item, i) => React.createElement(
            item.name.indexOf('title') === 0 ? 'h1' : 'div',
            { key: i.toString(), ...item },
            item.children.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
              ? React.createElement('img', { src: item.children, alt: 'img' })
              : item.children
          )
          )}
        </QueueAnim>
      </OverPack>
    );
  }
}

export default Content13;

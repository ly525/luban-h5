import React from 'react';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col } from 'antd';
import { page4 } from './data';

function getLi(num, d, i) {
  const t = num + 1;
  if (i > t * 4 - 1 || i < num * 4) {
    return null;
  }
  return (
    <Col className="col" span={4} key={i} offset={!(i % 4) ? 1 : 2}>
      <i style={{ backgroundImage: `url(${d})` }} />
    </Col>
  );
}
export default function Page4() {
  const children = [];
  for (let i = 0; i < Math.floor(page4.length / 4); i++) {
    children.push((
      <QueueAnim
        component={Row}
        type="bottom"
        key={i}
      >
        {page4.map(getLi.bind(this, i)).filter(item => item)}
      </QueueAnim>));
  }
  return (
    <div className="home-layout-wrapper home-user-wrapper">
      <OverPack className="home-layout" playScale={0.4}>
        <QueueAnim className="home-user" type="bottom" key="home-func" ease="easeOutQuart" leaveReverse>
          <h2 key="h2">我们的用户</h2>
          <i key="i" className="line" />
          {children}
        </QueueAnim>
      </OverPack>
    </div>
  );
}

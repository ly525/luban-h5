import React from 'react';
import { footer } from './data';

function antCloudFooter() {
  const children = footer.map((item, i) => (<div key={i}><a href={item.src} target="_blank">{item.text}</a></div>));
  return (<div>
    <div className="logo" key="logo">
      {/* <img src="https://gw.alipayobjects.com/zos/rmsportal/dnIbXmAgGbRxQJksRsJL.svg" width="72" height="82" /> */}
      <h1 style={{color: 'white'}}>Luban H5</h1>
    </div>
    <div key="nav" className="home-footer-nav-wrapper">
      {children}
    </div>
  </div>
  );
}

function Footer() {
  return (
    <div className="home-layout-wrapper home-footer-wrapper">
      <div className="home-layout">
        {antCloudFooter()}
        <p key="cop" className="copy">©2019 - 2019 Metrix-Transform All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;

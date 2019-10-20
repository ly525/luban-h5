import React from 'react';

export const Nav00DataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',
    children: 'https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg',
  },
  Menu: {
    className: 'header0-menu',
    children: [
      { name: 'item0', a: { children: '中文', href: '/' } },
      { name: 'item1', a: { children: 'EN', href: '/index-en' } },
      // { name: 'item2', a: { children: '导航三', href: '/page2' } },
      // { name: 'item3', a: { children: '导航四', href: '' } },
    ],
  },
  mobileMenu: { className: 'header0-mobile-menu' },
};

export const Footer00DataSource = {
  wrapper: { className: 'home-page-wrapper footer0-wrapper' },
  OverPack: { className: 'home-page footer0', playScale: 0.05 },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        ©2018
        {' '}
        <a href="https://motion.ant.design">Ant Motion</a>
        {' '}
        All Rights Reserved
      </span>
    ),
  },
};

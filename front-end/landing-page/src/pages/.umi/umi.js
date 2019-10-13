import './polyfills';
import history from './history';

import React from 'react';
import ReactDOM from 'react-dom';
import findRoute, {
  getUrlQuery,
} from '/Users/lambert/Documents/Code/Self/openSource/luban-h5/front-end/landing-page/node_modules/umi-build-dev/lib/findRoute.js';

// runtime plugins
const plugins = require('umi/_runtimePlugin');
window.g_plugins = plugins;
plugins.init({
  validKeys: [
    'patchRoutes',
    'render',
    'rootContainer',
    'modifyRouteProps',
    'onRouteChange',
    'modifyInitialProps',
    'initialProps',
  ],
});

// render
let clientRender = async () => {
  window.g_isBrowser = true;
  let props = {};
  // Both support SSR and CSR
  if (window.g_useSSR) {
    // 如果开启服务端渲染则客户端组件初始化 props 使用服务端注入的数据
    props = window.g_initialData;
  } else {
    const pathname = location.pathname;
    const activeRoute = findRoute(require('@tmp/router').routes, pathname);
    // 在客户端渲染前，执行 getInitialProps 方法
    // 拿到初始数据
    if (
      activeRoute &&
      activeRoute.component &&
      activeRoute.component.getInitialProps
    ) {
      const initialProps = plugins.apply('modifyInitialProps', {
        initialValue: {},
      });
      props = activeRoute.component.getInitialProps
        ? await activeRoute.component.getInitialProps({
            route: activeRoute,
            isServer: false,
            location,
            ...initialProps,
          })
        : {};
    }
  }
  const rootContainer = plugins.apply('rootContainer', {
    initialValue: React.createElement(require('./router').default, props),
  });
  ReactDOM[window.g_useSSR ? 'hydrate' : 'render'](
    rootContainer,
    document.getElementById('root'),
  );
};
const render = plugins.compose(
  'render',
  { initialValue: clientRender },
);

const moduleBeforeRendererPromises = [];
// client render
if (__IS_BROWSER) {
  Promise.all(moduleBeforeRendererPromises)
    .then(() => {
      render();
    })
    .catch(err => {
      window.console && window.console.error(err);
    });
}

// export server render
let serverRender, ReactDOMServer;
if (!__IS_BROWSER) {
  serverRender = async (ctx = {}) => {
    // ctx.req.url may be `/bar?locale=en-US`
    const [pathname] = (ctx.req.url || '').split('?');
    const history = require('@tmp/history').default;
    history.push(ctx.req.url);
    let props = {};
    const activeRoute =
      findRoute(require('./router').routes, pathname) || false;
    if (
      activeRoute &&
      activeRoute.component &&
      activeRoute.component.getInitialProps
    ) {
      const initialProps = plugins.apply('modifyInitialProps', {
        initialValue: {},
      });
      // patch query object
      const location = history.location
        ? { ...history.location, query: getUrlQuery(history.location.search) }
        : {};
      props = await activeRoute.component.getInitialProps({
        route: activeRoute,
        isServer: true,
        location,
        // only exist in server
        req: ctx.req || {},
        res: ctx.res || {},
        ...initialProps,
      });
      props = plugins.apply('initialProps', {
        initialValue: props,
      });
    } else {
      // message activeRoute or getInitialProps not found
      console.log(
        !activeRoute
          ? `${pathname} activeRoute not found`
          : `${pathname} activeRoute's getInitialProps function not found`,
      );
    }
    const rootContainer = plugins.apply('rootContainer', {
      initialValue: React.createElement(require('./router').default, props),
    });
    const htmlTemplateMap = {};
    return {
      htmlElement:
        activeRoute && activeRoute.path
          ? htmlTemplateMap[activeRoute.path]
          : '',
      rootContainer,
      matchPath: activeRoute && activeRoute.path,
      g_initialData: props,
    };
  };
  // using project react-dom version
  // https://github.com/facebook/react/issues/13991
  ReactDOMServer = require('react-dom/server');
}

export { ReactDOMServer };
export default (__IS_BROWSER ? null : serverRender);

require('../../global.less');

// hot module replacement
if (__IS_BROWSER && module.hot) {
  module.hot.accept('./router', () => {
    clientRender();
  });
}

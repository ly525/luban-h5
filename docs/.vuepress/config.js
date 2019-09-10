const container = require('markdown-it-container');

const ogprefix = 'og: http://ogp.me/ns#';
const title = '鲁班H5 文档';
const description = '前后端均开源的H5制作平台，类似易企秀、百度H5、Maka、人人秀.';
const color = '#2F80ED';
const author = 'ly525';
const url = 'http://docs.huban-h5.surge.sh/';

module.exports = {
  head: [
    ['link', { rel: 'icon', href: `/luban-logo.png` }],
    ['meta', { name: 'theme-color', content: color }],
    ['meta', { prefix: ogprefix, property: 'og:title', content: title }],
    ['meta', { prefix: ogprefix, property: 'twitter:title', content: title }],
    ['meta', { prefix: ogprefix, property: 'og:type', content: 'article' }],
    ['meta', { prefix: ogprefix, property: 'og:url', content: url }],
    [
      'meta',
      { prefix: ogprefix, property: 'og:description', content: description },
    ],
    [
      'meta',
      { prefix: ogprefix, property: 'og:image', content: `${url}luban-logo.png` },
    ],
    [
      'meta',
      { prefix: ogprefix, property: 'og:article:author', content: author },
    ],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    // ['link', { rel: 'apple-touch-icon', href: `/assets/apple-touch-icon.png` }],
    // ['link', { rel: 'mask-icon', href: '/assets/safari-pinned-tab.svg', color: color }],
    ['meta', { name: 'msapplication-TileImage', content: '/luban-logo.png' }],
    ['meta', { name: 'msapplication-TileColor', content: color }],
    ['script', { src: '/yandex.js' }],
  ],
  markdown: {
    anchor: {
      permalink: true,
    },
    // config: md => {
    //   md.use(require('markdown-it-decorate')) // https://github.com/vuejs/vuepress/issues/986
    //     .use(require('markdown-it-task-lists'))
    //     .use(...createContainer('intro'))
    //     .use(...createContainer('windows'))
    //     .use(...createContainer('ubuntu'))
    //     .use(...createContainer('mac'))
    //     .use(...createContainer('note'));
    //   const vuepressTabs = require('vuepress-tabs');
    //   vuepressTabs(md);
    // },
  },
  extendMarkdown (md) {
    md.use(require('markdown-it-decorate')) // https://github.com/vuejs/vuepress/issues/986
      .use(require('markdown-it-task-lists'))
      .use(...createContainer('intro'))
      .use(...createContainer('windows'))
      .use(...createContainer('ubuntu'))
      .use(...createContainer('mac'))
      .use(...createContainer('note'));
    const vuepressTabs = require('vuepress-tabs');
    vuepressTabs(md);
  },
  title,
  description,
  // why '/documentation' not work for surge.sh
  // base: '/' for surge.sh
  // base '/luban-h5/' for github pages
  base: '/luban-h5/',
  // ga: '',
  themeConfig: {
    nav: [
      { text: 'Document(En)', link: 'https://www.yuque.com/liuyan-ew1qk/oh5d0n?language=en-us' },
      { text: 'Website', link: 'https://ly525.github.io/luban-h5' },
    ],
    versions: [
      ['zh', '/zh/'],
      ['en', '/en/'],
    ],
    repo: 'ly525/luban-h5',
    // website: 'https://ly525.github.io/luban-h5',
    // slack: 'https://github.com/ly525/luban-h5',
    // blog: 'https://github.com/ly525/luban-h5',
    // liveDemo: 'https://ly525.github.io/luban-h5',
    docsDir: 'docs',
    // algolia: {
    //   apiKey: '0d43b0d883366a06e0f2ff8fe988ae51',
    //   indexName: 'luban-h5-docs',
    // },
    editLinks: true,
    editLinkText: 'Improve this page',
    serviceWorker: true,
    hiddenLinks: [
      '/zh/cli/CLI.html',
      '/zh/api-reference/reference.html',
    ],
    sidebar: {
      '/zh/': [
        {
          collapsable: false,
          title: '🚀 Getting started',
          children: [
            '/zh/getting-started/introduction',
            '/zh/getting-started/features',
            '/zh/getting-started/quick-start',
            '/zh/getting-started/code-structure',
            '/zh/getting-started/deployment',
            '/zh/getting-started/feedback',
            '/zh/getting-started/qa',
            '/zh/getting-started/discussion',
          ],
        },
        {
          collapsable: true,
          title: '💡 实现思路',
          children: [
            '/zh/guides/form-submit',
          ],
        },
        {
          collapsable: true,
          title: '🔌 Local plugins',
          children: [
            '/zh/plugin-development/quick-start',
          ],
        },
        // {
        //   collapsable: false,
        //   title: '📚 Resources',
        //   children: [
        //     [
        //       'https://github.com/ly525/luban-h5-docs/blob/master/CONTRIBUTING.md',
        //       'Contributing guide',
        //     ],
        //     '/zh/migration-guide/',
        //   ],
        // },
      ],
    },
  },
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github',
      locale: 'zh',

      // 其他的 Vssue 配置
      owner: 'ly525',
      repo: 'luban-h5-community',
      clientId: '95a13445d2ed9ca9a800',
      clientSecret: '08bbe2bf798d61f2814c8d4914c5fff145f4904e',
      prefix: '[From Comment]',
    },
  },
};

function createContainer(className) {
  return [
    container,
    className,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          return `<div class="${className} custom-block">\n`;
        } else {
          return `</div>\n`;
        }
      },
    },
  ];
}

module.exports = {
  title: '鲁班H5',
  base: '/luban-h5/',
  locales: {
    '/': {
      lang: 'en-US',
      // description: 'OpenSource Mobile Page Builder&Generator with Drag&Drop\r\n前后端均开源的H5制作平台，类似易企秀、百度H5、Maka、人人秀',
      description: 'OpenSource Mobile Page Builder&Generator',
    },
    '/zh/': {
      lang: 'zh-CN',
      // description: '前后端均开源的H5制作平台，类似易企秀、百度H5、Maka、人人秀',
    },
  },
  serviceWorker: {},
  themeConfig: {
    repo: 'ly525/luban-h5',
    lastUpdated: 'Last Updated',
    editLinks: true,
    docsDir: 'docs',
    docsBranch: 'dev',
    serviceWorker: {
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh',
      },
    },
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          // { text: 'Guide', link: '/guide/' },
          // { text: 'Config', link: '/config/' },
          // { text: 'API', link: '/api/' },
          { text: 'Website', link: 'https://h5.luban-h5.com' },
          { text: 'Changelog', link: 'https://github.com/ly525/luban-h5/releases' },
        ],
        sidebar: {
          '/': [
            {
              collapsable: false,
              title: '🚀 Getting started',
              children: [
                '/en/getting-started/introduction',
                '/en/getting-started/features',
                '/en/getting-started/quick-start',
                '/en/getting-started/deployment',
                '/en/getting-started/discussion',
              ],
            },
            {
              collapsable: true,
              title: '💡Implementation',
              children: [
                '/en/implementation/code-structure',
                '/en/implementation/form-submit',
              ],
            },
            {
              collapsable: true,
              title: '🔌 Local plugins',
              children: [
                '/en/plugin-development/quick-start',
              ],
            },
            {
              collapsable: false,
              title: 'Migrating',
              children: [
                '/en/migration-guide/',
              ],
            },
          ],
        },
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          // { text: '指南', link: '/zh/guide/' },
          // { text: '配置', link: '/zh/config/' },
          // { text: 'API', link: '/zh/api/' },
          // { text: '插件', link: '/zh/plugin/' },
          { text: '首页', link: 'https://h5.luban-h5.com' },
          { text: '发布日志', link: 'https://github.com/ly525/luban-h5/releases' },
        ],
        sidebar: {
          '/': [
            {
              collapsable: false,
              title: '🚀 Getting started',
              children: [
                '/zh/getting-started/introduction',
                '/zh/getting-started/features',
                '/zh/getting-started/quick-start',
                '/zh/getting-started/deployment',
                '/zh/getting-started/discussion',
              ],
            },
            {
              collapsable: false,
              title: '💡实现原理',
              children: [
                '/zh/implementation/code-structure',
                '/zh/implementation/form-submit',
              ],
            },
            {
              collapsable: true,
              title: '🔌 Local plugins',
              children: [
                '/zh/plugin-development/quick-start',
              ],
            },
            {
              collapsable: false,
              title: '迁移',
              children: [
                '/zh/migration-guide/',
              ],
            },
          ],
        },
      },
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
    // reference: https://github.com/vuejs/vuepress/issues/1435
    'dehydrate': {}
  },
  // plugins: [
  //   [
  //     '@vuepress/google-analytics',
  //     {
  //       ga: 'UA-149864185-1',
  //     },
  //   ],
  // ],
};
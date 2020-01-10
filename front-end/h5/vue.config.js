/*
 * @Author: ly525
 * @Date: 2019-12-14 22:43:55
 * @LastEditors  : ly525
 * @LastEditTime : 2020-01-10 23:37:15
 * @FilePath: /luban-h5/front-end/h5/vue.config.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
const path = require('path')
// const isProd = process.env.NODE_ENV === 'production'
const target = 'http://localhost:1337'
const engineOutputDir = path.join(__dirname, '../../back-end/h5-api/public/engine-assets')
const editorBuildOutputDir = path.join(__dirname, '../../back-end/h5-api/build-editor')

let page
switch (process.env.PAGE) {
  case 'ENGINE':
    page = {
      entry: 'src/engine-entry.js',
      outputDir: engineOutputDir
    }
    break
  case 'EDITOR':
  default:
    page = {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      // outputDir: 'dist'
      outputDir: editorBuildOutputDir
      // publicPath: isProd ? '/main/' : '/'
    }
}

const configureWebpack = {
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
}

module.exports = {
  outputDir: page.outputDir,
  publicPath: page.publicPath,
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  pages: { index: page },
  devServer: {
    proxy: {
      '^/upload|content-manager|users-permissions|works|admin|psd-files|workforms|third-libs|engine-assets/': {
        target,
        changeOrigin: true,
        ws: false
      }
    }
  },
  configureWebpack,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          // './src/theme'
        ]
      }
    },
    extract: false
  },
  pwa: {
    iconPaths: {
      favicon32: 'img/icons/favicon.ico',
      favicon16: 'img/icons/favicon.ico',
      appleTouchIcon: 'img/icons/favicon.ico',
      maskIcon: 'img/icons/favicon.ico',
      msTileImage: 'img/icons/favicon.ico'
    }
  }
}

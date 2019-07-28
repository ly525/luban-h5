const ProxyAgent = require('proxy-agent')
const isProd = process.env.NODE_ENV === 'production'

const API_ORIGIN = 'https://radiant-depths-79548.herokuapp.com'
const publicPath = isProd ? '/luban-h5/' : '/'
// const proxy = isProd ? API_ORIGIN : 'http://localhost:1337'

module.exports = {
  runtimeCompiler: true,
  publicPath,
  devServer: {
    // proxy: API_ORIGIN
    proxy: {
      '/': {
        agent: new ProxyAgent('socks5://127.0.0.1:1086'),
        target: API_ORIGIN,
        changeOrigin: true
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page'
    }
    // engine: {
    //   entry: 'src/engine-entry.js'
    // }
  }
}

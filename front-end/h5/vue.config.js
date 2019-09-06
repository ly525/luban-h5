const isProd = process.env.NODE_ENV === 'production'
const target = 'http://localhost:1337'
module.exports = {
  runtimeCompiler: true,
  // 因为需要部署到 github pages，所以需要将 publicPath 设为 "/< GitHub Repo Name>/"
  publicPath: isProd ? '/luban-h5/' : '/',
  productionSourceMap: false,
  devServer: {
    // proxy: API_ORIGIN
    proxy: {
      '/works': {
        target,
        changeOrigin: true,
        ws: false
      },
      '/upload': {
        target,
        changeOrigin: true,
        ws: false
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

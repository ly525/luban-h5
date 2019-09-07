const target = 'http://localhost:1337'
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
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

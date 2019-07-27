module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/luban-h5/'
    : '/',
  devServer: {
    proxy: 'http://localhost:1337'
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

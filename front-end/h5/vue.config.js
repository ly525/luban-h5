module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/luban-h5/'
    : '/',
  devServer: {
    proxy: 'http://localhost:1337'
  }
}

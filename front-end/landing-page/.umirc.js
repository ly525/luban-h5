var path = require('path')

export default {
  publicPath: "/luban-h5/",
  history: 'hash',
  disableCSSModules: true,
  plugins: [
    [
      'umi-plugin-react', {
        // dynamicImport: true,
        antd: true,
      }
    ],
  ],
  chainWebpack(config) {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
}
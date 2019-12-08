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
  ]
}
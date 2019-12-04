export default {
  history: 'hash',
  disableCSSModules: true,
  plugins: [
    [
      'umi-plugin-react', {
        dynamicImport: true,
        antd: true,
      }
    ],
  ]
}
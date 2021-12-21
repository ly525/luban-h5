module.exports = {
  presets: [
    '@vue/app'
    // ['es2015', { 'modules': false }]
  ],
  'plugins': [
    '@babel/plugin-proposal-optional-chaining',
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}

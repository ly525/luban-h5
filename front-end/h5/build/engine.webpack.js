let path = require('path')
let env = { NODE_ENV: '"production"' }
let ora = require('ora')
let rm = require('rimraf')
let chalk = require('chalk')
let webpack = require('webpack')

function assetsPath (_path) {
  let assetsSubDirectory = '/engine-assets'
  return path.posix.join(assetsSubDirectory, _path)
}

function resolve (dir) {
  // console.log(path.join(__dirname, '..', '../../back-end/preview/public/be-static-luban-h5/engine'));
  return path.join(__dirname, '..', dir)
}

const engineBuildOutputDir = resolve('../../back-end/h5-api/public/engine-assets')

process.env.NODE_ENV = 'production'

let spinner = ora('building for production...')
spinner.start()

let webpackConfig = {
  mode: 'production',
  entry: {
    engine: './src/engine-entry.js'
  },
  //   devtool: config.build.productionSourceMap ? '#source-map' : false,
  devtool: '#source-map',
  output: {
    path: engineBuildOutputDir,
    filename: '[name].js',
    // publicPath: '/public-path',
    library: 'Engine'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  externals: {
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              // enable CSS Modules
              modules: true,
              // customize generated class names
              localIdentName: '[local]_[hash:base64:8]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
}

rm(engineBuildOutputDir, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    // process.stdout.write(
    //   stats.toString({
    //     colors: true,
    //     modules: true,
    //     children: true,
    //     chunks: true,
    //     chunkModules: true
    //   }) + '\n\n'
    // )

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"
      )
    )
  })
})

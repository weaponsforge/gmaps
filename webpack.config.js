require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // Files to watch for
  entry: './src/index.js',

  // Bundle/build output directory
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title : 'Google Maps APIs',
      template : './src/index.html'
    }),

    // Environment variables
    new webpack.EnvironmentPlugin(['APP_NAME']),
    new webpack.EnvironmentPlugin((Object.keys(process.env).filter(key => key.startsWith('MAP_')))),
    new webpack.EnvironmentPlugin((Object.keys(process.env).filter(key => key.startsWith('MAPBOX_'))))
  ],

  // Set node modules to use for various file types
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        type: 'asset'
     }
    ]
  },

  // Development server set-up - define static assets directory and paths
  devServer: {
    open: true,
    hot: false, // disable hot reload for plain HTML/CSS/JS development
    compress: true,
    static: {
      directory: path.join(__dirname, 'src'),
      publicPath: '/'
    }
  }
}
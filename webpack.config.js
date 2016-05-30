var HtmlWebpackPlugin = require('html-webpack-plugin')

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  inject: 'body'
})

module.exports = {
  entry: [
    './app/index.js'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',

  },

  module: {
    loaders: [
      {test: /\.js$/, exlude: /node_modules/, loader: 'babel'},
      {test: /\.css$/, loader: 'css'}
    ]
  },

  plugins: [HtmlWebpackPluginConfig]

}

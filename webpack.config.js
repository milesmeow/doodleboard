var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: __dirname + '/build',
    filename: 'webpack-bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/build',
    historyApiFallback: true
  },
  module: {
		rules: [{
			test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './public/js/app.js',
  devServer:{
    contentBase: __dirname + '/dist',
    // hot: true,
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: 'index.html'
  //   }),
  //   new webpack.NamedModulesPlugin(),
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    library: 'temColumn'
  }
};
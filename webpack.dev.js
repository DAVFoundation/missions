const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'src'),
    port: 3333,
    historyApiFallback: true
  },
});

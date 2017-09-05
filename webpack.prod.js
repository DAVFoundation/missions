const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'MISSION_CONTROL_HOST': JSON.stringify('https://ctrl.missions.io')
      }
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' },
      { from: 'src/browserconfig.xml' },
      { from: 'src/manifest.json' },
    ]),
  ]
});

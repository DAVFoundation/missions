const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
      hasServiceWorker: true
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' },
      { from: 'src/browserconfig.xml' },
      { from: 'src/manifest.json' },
    ]),
    // WorkboxPlugin needs to remain as the last plugin
    new WorkboxPlugin({
      globDirectory: './dist/',
      globPatterns: ['**/*.{png,svg,gif}'],
      swDest: path.resolve(__dirname, 'dist/service-worker.js')
    })
  ]
});

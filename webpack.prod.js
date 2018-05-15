const path = require('path');
const webpack = require('webpack');
const getCommon = require('./webpack.common.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(getCommon(process.env.NODE_ENV), {
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        MISSION_CONTROL_URL: JSON.stringify('https://ctrl.missions.io'),
        CAPTAIN_SIM_URL: JSON.stringify('https://ctrl.missions.io'),
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['vendor', 'drone_simulation'],
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new HtmlWebpackPlugin({
      filename: 'delivery_drones.html',
      chunks: ['vendor', 'delivery_drones'],
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new HtmlWebpackPlugin({
      filename: 'drone_charging.html',
      chunks: ['vendor', 'drone_charging'],
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new HtmlWebpackPlugin({
      filename: 'route_plan.html',
      chunks: ['vendor', 'route_plan'],
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' },
      { from: 'src/browserconfig.xml' },
      { from: 'src/manifest.json' },
      { from: 'src/lib/mapbox-gl-rtl-text.js.min' , to: 'lib' },
    ]),
    new ExtractTextPlugin('styles.css'),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
});

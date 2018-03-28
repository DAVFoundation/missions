const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const getCommon = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = merge(getCommon(process.env.NODE_ENV), {
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'src'),
    port: 3333,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['vendor', 'drone_simulation'],
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new HtmlWebpackPlugin({
      filename: 'delivery_drones/index.html',
      chunks: ['vendor', 'delivery_drones'],
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        MISSION_CONTROL_HOST: JSON.stringify('http://localhost:8888'),
      },
    }),
  ],
});

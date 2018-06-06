const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const getCommon = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';
const appName=process.env.APP;

console.log(`Building ${appName}...`);

module.exports = merge(getCommon(process.env.NODE_ENV,appName), {
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'src'),
    host:'0.0.0.0',
    port: 3333,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['vendor', 'app'],
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        APP: JSON.stringify(process.env.APP),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BLOCKCHAIN_TYPE: JSON.stringify('TESTNET'),
        MISSION_CONTROL_URL: JSON.stringify('http://localhost:8888'),
        CAPTAIN_SIM_URL: JSON.stringify('http://localhost:8887')
      },
    }),
  ],
});

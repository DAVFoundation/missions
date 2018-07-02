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
const appName=process.env.APP;

console.log(`Building ${appName}...`);

const favicon = process.env.DOMAIN || 'missions';
const title = (domain => {
  switch (domain) {
  default:
  case 'missions':
    return 'Missions';
  case 'mooving':
    return 'Mooving';
  }
})(process.env.DOMAIN);

module.exports = merge(getCommon(process.env.NODE_ENV,appName), {
  devtool: 'cheap-module-source-map',
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'src'),
    host:'0.0.0.0',
    port: 3333,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin([`dist/${appName}`]),
    new webpack.DefinePlugin({
      'process.env': {
        APP: JSON.stringify(process.env.APP),
        DOMAIN: JSON.stringify(process.env.DOMAIN),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BLOCKCHAIN_TYPE: JSON.stringify('MAINNET'),
        MISSION_CONTROL_URL: JSON.stringify('https://ctrl.mooving.io'),
        CAPTAIN_SIM_URL: JSON.stringify('https://captain-sim.mooving.io'),
      },
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, `src/favicon_${favicon}.ico`), to: path.resolve(__dirname, `src/favicon.ico`) }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['vendor', 'app'],
      title:`${title}`,
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' },
      { from: 'src/browserconfig.xml' },
      { from: 'src/manifest.json' },
      { from: 'src/lib/mapbox-gl-rtl-text.js.min' , to: 'lib' },
    ]),
    new ExtractTextPlugin('[name].bundle.css'),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
});

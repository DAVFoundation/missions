const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = 'development') => {
  return {
    entry: {
      drone_simulation: './src/apps/drone_simulation/Main.jsx',
      delivery_drones: './src/apps/delivery_drones/Main.jsx',
      vendor: [
        'mapbox-gl',
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'redux',
        'redux-actions',
        'redux-devtools-extension',
        'redux-promise-middleware',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: (env === 'production') ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
            	{ loader: 'css-loader', options: { minimize: true } }
            ]
          }) : [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js'
      })
    ]
  };
};

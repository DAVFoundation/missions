const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = 'development') => {
  return {
    entry: {
      app: './src/Main.jsx',
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
      filename: 'bundle.js',
      sourceMapFilename: '[file].map'
    },
    resolve: {
      modules: [
        path.resolve('./node_modules'),
        path.resolve('./src')
      ]
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
            use: 'css-loader'
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

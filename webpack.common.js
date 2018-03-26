const path = require('path');

module.exports = (env = 'development') => {
  return {
    entry: {
      drone_simulation: './src/apps/drone_simulation/Main.jsx',
      delivery_drones: './src/apps/delivery_drones/Main.jsx',
      vendor: [
        '@davfoundation/dav-js',
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
      filename: '[name].bundle.[chunkhash:8].js',
      sourceMapFilename: '[file].map',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
          ]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'eslint-loader', }
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader', },
            {
              loader: 'css-loader',
              options: {
                minimize: env === 'production' ? true : false
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            filename: 'vendor.bundle.[chunkhash:8].js',
          }
        }
      },
    },
  };
};

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const _ = require('lodash');
const autoprefixer = require('autoprefixer');

const pkg = require('./package.json');

// Develop environment config
const dev = {
  resolve: {
    extensions: ['.js'],
  },
  // With eval, the source map is less readable, but build is much faster
  devtool: 'sourcemap',
  entry: {
    dev: [
      'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    ],
    moduleA: ['./modules/ModuleA/index.js'],
    moduleB: ['./modules/ModuleB/index.js'],
  },
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static',
    filename: 'scripts/[name].min.js',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [{
        loader: 'react-hot-loader/webpack',
      }, {
        loader: 'babel-loader',
      }],
      exclude: /node_modules/,
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader?limit=8192&name=static/images/[hash].[ext]',
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
      }],
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: ['node_modules'],
        },
      }],
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          autoprefixer({ browsers: ['> 0.04%'] });
        },
        debug: true,
      },
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: '抱米',
      template: 'template.html',
      inject: true,
      chunks: ["moduleA"],
      filename: 'moduleA.html',
    }),
    new HtmlWebpackPlugin({
      title: '抱米',
      template: 'template.html',
      inject: true,
      chunks: ["moduleB"],
      filename: 'moduleB.html',
    }),
  ],
};

module.exports = {
   dev,
};

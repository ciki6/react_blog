const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/public/dist/",
    filename: "[name]-[hash].js",
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=40000'
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            publicPath: '../style/'
          }
        },
        "css-loader", 'sass-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname + '/public',
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
};
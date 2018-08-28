const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: __dirname + "/src/index.js",
	output: {
		path: __dirname + "/public/script/",
		filename: "bundle.[chunkHash:8].js",
		chunkFilename: 'chunk/[name].[chunkHash:8].js',
		publicPath: '/script/'
	},
	module: {
		rules: [{
			test: /\.js$/,
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
		// new webpack.BannerPlugin('版权所有，翻版必究'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
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
		})
	]
};
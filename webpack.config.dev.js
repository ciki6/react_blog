const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: __dirname + "/src/index.js",
	output: {
		path: __dirname + "/public/",
		filename: "bundle-[hash].js",
		// chunkFilename: 'chunk/[name].chunk.js',
		// publicPath: '/script/'
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
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: 'css-loader'
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html" 
        }),
		new ExtractTextPlugin("../style/style.css", {
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin(),
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
		new CleanWebpackPlugin('public/*.js', {
			root: __dirname,
			verbose: true,
			dry: false
		})
	]
}
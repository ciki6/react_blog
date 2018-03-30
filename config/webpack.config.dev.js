const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path')
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: path.resolve(__dirname , '../src/index.js'),//已多次提及的唯一入口文件
    output: {
        path: path.resolve(__dirname , '../dist'),//打包后的文件存放的地方
        filename: 'app/[name]_[hash:8].js',//打包后输出文件的文件名
        chunkFilename: 'chunk/[name]_[hash:8].chunk.js',
        publicPath: '/script/'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude: /node_modules/
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
    }
        ]
    },

    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),//new 一个这个插件的实例，并传入相关的参数
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new ExtractTextPlugin("../style/style.css", {
			allChunks: true
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json')
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
}
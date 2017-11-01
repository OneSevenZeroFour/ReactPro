var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var publicPath = "/";

//console.log(__dirname, publicPath)
/*
	entry ['babel-polyfill',
		'react-hot-loader/patch',]  //react-hot-loader 热替换配置参数
    entry ['webpack-hot-middleware/client',] //webpack-hot-middleware 配置参数
   
*/
module.exports = {
    entry: [
        //'webpack-hot-middleware/client',
        //'webpack/hot/dev-server',
        path.resolve(__dirname, './src/main.jsx')
    ],
    //[name].[hash].bundle.js 添加hash值防止304 待检验
    output: {
        path: path.resolve(__dirname, './dist'),
        //filename: '[name].[hash].bundle.js',
        filename: 'bundle.js',
        //publicPath: '/dist/'
        publicPath
    },
    devtool: 'eval-source-map',
    devServer: {
        //
        contentBase: path.join(__dirname, '/'),
        publicPath,
        historyApiFallback: true,
        hot: true,
        inline: true,
        //noInfo: true
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader'
            }],
            exclude: /node_modules/
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [{
                loader: 'file-loader'
            }]
        }, {
            test: /\.(woff|svg|eot|ttf)$/,
            use: [{
                loader: 'url-loader?limit=50000'
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        //全局变量引用 不需要 import 可以全局使用 $ 
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
    ],
}
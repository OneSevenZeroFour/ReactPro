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
            }, {
                //image-webpack-loader 图片类型检验和质量压缩
                loader: 'image-webpack-loader',
                options: {
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: true,
                        },
                        optipng: {
                            optimizationLevel: 7,
                        }
                    }
                }
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
        // new HtmlWebpackPlugin({
        // 	title: 'react项目',
        // 	inject: 'body',
        // 	showErrors: true,
        // 	template: __dirname + "/src/index.tmpl.ejs" //new 一个这个插件的实例，并传入相关的参数
        // }),
    ],
}
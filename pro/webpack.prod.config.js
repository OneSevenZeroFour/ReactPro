var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var publicPath = "/";

const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractSCSS = new ExtractTextPlugin('css/[name]-two.css');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/main.jsx'),
        //命名需要缓存的文件名
        vendor: [
            'jquery'
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name][hash].js',
        publicPath
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    //限制图片 文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL base64位
                    limit: 50000,
                    name: `img/[name].[hash:7].[ext]`
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    //限制图片 文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL base64位
                    limit: 10000,
                    name: `fonts/[name].[hash:7].[ext]`
                }
            }]
        }, {
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader"],
            })
        }, {
            test: /\.scss$/,
            use: extractSCSS.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"],
            })
        }]
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        //使用 html 模板
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html',
            inject: true
        }),

        //全局变量引用 不需要 import 可以全局使用 $ 
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),

        //压缩代码

        /*
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false
                }
            }),
        */

        //该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
        new webpack.HashedModuleIdsPlugin(),

        //CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，
        //这个文件包括多个入口 chunk 的公共模块。通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
                // (随着 entry chunk 越来越多，
                // 这个配置保证没其它的模块会打包进 vendor chunk)
        }),

        //webpack1 到 webpack2 的过渡
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // 复制静态文件 custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './src/assets/img'),
            to: path.resolve(__dirname, './dist/src/assets/img')
        }, {
            from: path.resolve(__dirname, './src/assets/images'),
            to: path.resolve(__dirname, './dist/src/assets/images')
        }]),

        // 拆分 css into its own file
        extractCSS,
        extractSCSS


    ],
}
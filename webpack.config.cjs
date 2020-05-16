/* eslint-disable */
// Need to use CJS because webpack-cli doesn't support ESM quite yet
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginTemplate = require('html-webpack-template')

module.exports = {
    entry: {
        frontend: path.resolve(__dirname, 'app', 'frontend', 'app.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist', 'frontend')
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: HtmlWebpackPluginTemplate,

            // Template options
            scripts: [
                'frontend.bundle.js',
                'vendor.bundle.js'
            ],
            links: [
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
            ],
            title: 'Noggle',
            appMountId: 'app',
            meta: [{
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /static/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
}

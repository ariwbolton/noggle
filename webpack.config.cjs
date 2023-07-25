/* eslint-disable */
// Need to use CJS because webpack-cli doesn't support ESM quite yet
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        frontend: path.resolve(__dirname, 'app', 'frontend', 'app.jsx')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist', 'frontend')
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Noggle',
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
                use: ['babel-loader']
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
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

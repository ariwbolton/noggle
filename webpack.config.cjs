// Need to use CJS because webpack-cli doesn't support ESM quite yet
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        frontend: path.resolve(__dirname, 'app', 'frontend', 'app.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist', 'frontend')
    },
    devServer: {
        proxy: {
            '/': 'http://localhost:3000'
        },
        port: 3002
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: []
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

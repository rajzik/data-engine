import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import NyanProgressWebpackPlugin from 'nyan-progress-webpack-plugin';

const config = {
    port: 3000
};


const isProduction = process.env.NODE_ENV === 'production';

let entries = ['./demo/src/index'];
if (isProduction) {
    entries = [`webpack-dev-server/client?http://localhost:${config.devServerPort}`, 'webpack/hot/only-dev-server', ...entries];
}

module.exports = {
    devtool: 'eval',
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'demo/dist'),
        filename: 'js/bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'demo/index.html',
            env: process.env
        }),
        new webpack.DefinePlugin({
            'process.env': [
                'NODE_ENV',
                'npm_package_version',
                'npm_package_name',
                'npm_package_description',
                'npm_package_homepage'
            ].reduce((env, key) => {
                env[key] = JSON.stringify(process.env[key]);
                return env;
            }, {})
        }),
        new webpack.NoErrorsPlugin(),
        new NyanProgressWebpackPlugin()
    ].concat(isProduction ? [
        new CleanWebpackPlugin(['demo/dist', 'lib'])
    ] : [
        new webpack.HotModuleReplacementPlugin()
    ]),
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            'src'
        ]
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            include: [
                path.join(__dirname, 'src'),
                path.join(__dirname, 'demo/src')
            ],
            use: [
                'babel-loader'
            ]
        }]
    },
    devServer: isProduction ? null : {
        contentBase: 'demo',
        quiet: false,
        port: config.devServerPort,
        hot: true,
        stats: {
            chunkModules: false,
            colors: true
        },
        historyApiFallback: true
    },
    node: {
        fs: 'empty'
    }
};

// {
//             test: /\.jsx?$/,
//             loaders: ['babel'],
            // include: [
            //     path.join(__dirname, 'src'),
            //     path.join(__dirname, 'demo/src')
            // ]
//         }

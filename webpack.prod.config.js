 	const webpack = require('webpack');

module.exports = {
    entry: './reactApp/app.js',
    output: {
        path: __dirname + '/public',
        filename: 'app.bundle.js',
        publicPath: '/public'
    },
    module: {
        rules: [
            { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
            
        ],
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: './public/index.dev.html',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

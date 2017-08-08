const webpack = require('webpack');

module.exports = {
    entry: './reactApp/app.js',
    output: {
        path: __dirname + '/build',
        filename: 'app.bundle.js',
        publicPath: '/build'
    },
    module: {
        rules: [
            { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
	    {test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ],
    },
    resolve: {
        extensions: ['.js', '.css']
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: './build/index.dev.html',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

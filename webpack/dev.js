const merge = require('webpack-merge');
const common = require('./common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: './dist'
    }
});

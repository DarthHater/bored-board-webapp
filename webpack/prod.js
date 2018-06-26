const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./common.js');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ],
    devServer: {
        public: 'vivalavinyl-webapp.herokuapp.com',
        contentBase: './dist'
    }
});

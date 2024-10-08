const path = require('path');

module.exports = {
    entry: './src/app.js',
    target: 'node',
    mode: 'production',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    }
};
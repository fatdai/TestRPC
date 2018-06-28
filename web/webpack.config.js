const path = require('path');

module.exports = {
    entry: './js/web_main.js',
    output: {
        path: path.resolve(__dirname, 'public/html'),
        filename: 'bundle.js'
    },
    mode: 'none'
};
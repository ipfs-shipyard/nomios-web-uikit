const path = require('path');

module.exports = ({ config }) => {
    // Make dynamic import chunk names nicer
    config.output.chunkFilename = '[name].bundle.js';

    // Compile node_modules
    config.module.rules[0].exclude = [];

    // Enable CSS modules and PostCSS for the project
    config.module.rules.unshift({
        test: /\.css$/,
        exclude: path.join(__dirname, '../node_modules'),
        loader: [
            require.resolve('style-loader'),
            {
                loader: require.resolve('css-loader'),
                options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]!',
                },
            },
            require.resolve('postcss-loader'),
        ],
    });

    // Load SVG files and create an external sprite
    // While this has a lot of advantages such as not blocking the initial load,
    // it might not workout for every SVG, see: https://github.com/moxystudio/react-with-moxy/issues/6
    config.module.rules.unshift({
        test: /\.svg$/,
        use: [
            require.resolve('raw-loader'),
            // Uniquify classnames and ids so that they are unique and
            // don't conflict with each other
            {
                loader: require.resolve('svg-css-modules-loader'),
                options: {
                    transformId: true,
                },
            },
        ],
    });

    // Wrap all rules into a `oneOf` so that only 1 matches
    config.module.rules = [{ oneOf: config.module.rules }];

    return config;
}

const path = require('path');
const SvgStorePlugin = require('external-svg-sprite-loader');

module.exports = ( config ) => {
    // Compile node_modules
    config.module.rules[0].exclude = [];

    config.output.chunkFilename = '[name].bundle.js';

    // CSS files loader for node_modules
    config.module.rules.push({
        test: /\.css$/,
        include: path.join(__dirname, '../node_modules'),
        loader: [
            'style-loader',
            'css-loader',
        ],
    });

    // Enable CSS modules and PostCSS
    config.module.rules.push({
        test: /\.css$/,
        exclude: path.join(__dirname, '../node_modules'),
        loader: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]!',
                },
            },
            'postcss-loader',
        ],
    });

    // Load SVG files and create an external sprite
    // While this has a lot of advantages such as not blocking the initial load,
    // it might not workout for every SVG, see: https://github.com/moxystudio/react-with-moxy/issues/6
    config.module.rules.push({
        test: /\.svg$/,
        use: [
            {
                loader: 'raw-loader',
                options: {
                    name: 'static/media/svg-sprite.svg',
                },
            },
            // Uniquify classnames and ids so that if svgxuse injects the sprite into the body,
            // it doesn't cause DOM conflicts
            {
                loader: 'svg-css-modules-loader',
                options: {
                    transformId: true,
                },
            },
        ],
    });
    config.plugins.push(new SvgStorePlugin());

    // Support web fonts
    config.module.rules.push({
        test: /\.(woff2|woff)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[ext]',
                },
            },
        ],
    });

    return config;
}

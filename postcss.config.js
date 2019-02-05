/* eslint-disable prefer-import/prefer-import-over-require */
const path = require('path');

module.exports = require('postcss-preset-moxy')({
    // Any non-relative imports are resolved to this path
    importPath: path.join(__dirname, 'src/styles'),
    // Process relative url statements
    // Note that when building, we want to translate src/ to dist/
    url: {
        url: process.env.POSTCSS_ENV !== 'dist' ?
            'rebase' :
            (asset, dir) => {
                const absolutePath = asset.absolutePath.replace(/\bsrc\b/, 'dist');

                return path.relative(dir.to, absolutePath);
            },
    },
});

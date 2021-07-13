const Global = require("../helpers/global");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => ({
    removeEmptyChunks: false,
    minimize: !Global.devMode,
    minimizer: [
        new TerserPlugin({
            extractComments: false,
        }),
    ],
    splitChunks: {
        chunks: "all",
        cacheGroups: {
            ...Global.getCacheGroups(),
            default: {
                test: /[\\/]node_modules[\\/]/i,
                name(module) {
                    return `chunks/vendors`;
                },
                ...groupsOptions,
            },
        },
    },
});

/**
 * Group options
 */
const groupsOptions = {
    chunks: "all",
    enforce: true,
    minChunks: 1,
    minSize: 0,
    reuseExistingChunk: true,
};

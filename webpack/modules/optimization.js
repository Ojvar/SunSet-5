const Global = require("../helpers/global");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => ({
    minimize: !Global.devMode,
    minimizer: [
        new TerserPlugin({
            extractComments: false,
        }),
    ],

    splitChunks: {
        chunks: "async",
        minSize: 20000,
        minRemainingSize: 0,
        maxSize: 300000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
            vue: {
                test: /[\\/]node_modules[\\/]vue/i,
                name(module, chunks, cacheGroupKey) {
                    const moduleFileName = module
                        .identifier()
                        .split("/")
                        .reduceRight((item) => item)
                        .replace(".js", "");

                    return `chunks/${moduleFileName}`;
                },
                chunks: "all",
                reuseExistingChunk: true,
            },

            // defaultVendors: {
            //     test: /[\\/]node_modules[\\/]/,
            //     priority: -10,
            //     reuseExistingChunk: true,
            // },

            // default: {
            //     minChunks: 2,
            //     priority: -20,
            //     reuseExistingChunk: true,
            // },
        },
    },
});

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
            vue: {
                ...groupsOptions,
                test: /[\\/]node_modules[\\/]vue/i,
                name: "chunks/vue",
                chunks: "all",
                priority: 100,
            },

            buefy: {
                ...groupsOptions,
                test: /[\\/]node_modules[\\/]buefy/i,
                name: "chunks/buefy",
                chunks: "all",
                priority: 100,
            },

            validatorjs: {
                ...groupsOptions,
                test: /[\\/]node_modules[\\/]validatorjs/i,
                name: "chunks/validatorjs",
                chunks: "all",
                priority: 100,
            },

            axios: {
                ...groupsOptions,
                test: /[\\/]node_modules[\\/]axios/i,
                name: "chunks/axios",
                chunks: "all",
                priority: 100,
            },

            default: {
                test: /[\\/]node_modules[\\/]/i,
                name(module) {
                    const packageName = module.context.match(
                        /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                    )[1];

                    return `chunks/${packageName.replace("@", "")}`;
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

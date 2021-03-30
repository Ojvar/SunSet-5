const Global = require("../helpers/global");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => ({
    removeEmptyChunks: true,

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
                test: /[\\/]node_modules[\\/]vue/i,
                name: "chunks/vue",
                chunks: "all",
                priority: 100,
            },
            buefy: {
                test: /[\\/]node_modules[\\/]buefy/i,
                name: "chunks/buefy",
                chunks: "all",
                priority: 90,
            },
            validatorjs: {
                test: /[\\/]node_modules[\\/]validatorjs/i,
                name: "chunks/validatorjs",
                chunks: "all",
                priority: 80,
            },
            axios: {
                test: /[\\/]node_modules[\\/]axios/i,
                name: "chunks/axios",
                chunks: "all",
                priority: 70,
            },

            default: {
                test: /[\\/]node_modules[\\/]/i,
                chunks: "all",
                priority: -100,
            },
        },
    },
});

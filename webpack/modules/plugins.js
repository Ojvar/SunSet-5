const Global = require("./global");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (devMode, entries) => [
    new vueLoaderPlugin(),
    miniCssExtractPlugin(entries),
    suppressPlugin(entries),
    manifest(),
];

/**
 * VueLoader plugin
 */
function vueLoaderPlugin() {
    const VueLoaderPlugin = require("vue-loader/lib/plugin");

    return new VueLoaderPlugin();
}

/**
 * Suppress plugin
 */
function suppressPlugin(entries) {
    const SuppressChunksPlugin = require("suppress-chunks-webpack-plugin")
        .default;
    const options = Object.keys(entries).filter((x) =>
        x.startsWith("styles__")
    );

    return new SuppressChunksPlugin(options, { filter: /\.js$/ });
}

/**
 * Mini Css plugin
 */
function miniCssExtractPlugin(entries) {
    return new MiniCssExtractPlugin({
        filename: (chunk) => Global.convertName(chunk.chunk.name) + ".css",
        chunkFilename: (chunk) => Global.convertName(chunk.chunk.name) + ".css",
        // filename: devMode ? "[name].css" : "[name].[contenthash].css",
        // chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
    });
}

/**
 * WebpackManifest plugin
 */
function manifest(env, entries) {
    const AssetListWebpackPlugin = require("asset-list-webpack-plugin");

    return new AssetListWebpackPlugin({});
}

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EliminateEmptyChunkFilePlugin = require("eliminate-empty-chunk-file-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

const Global = require("../helpers/global");

module.exports = () => [
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
        filename: (data) => {
            const name =
                data.chunk.name.replace("styles_", "styles/") +
                (Global.devMode ? "" : ".[contenthash]") +
                ".css";

            return name;
        },
    }),

    new EliminateEmptyChunkFilePlugin({
        scriptPattern: /^(?!scripts[\\/]).*\.m?js$/i,
    }),

    new WebpackAssetsManifest({}),
];

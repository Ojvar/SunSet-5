const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EliminateEmptyChunkFilePlugin = require("eliminate-empty-chunk-file-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const CopyPlugin = require("copy-webpack-plugin");
const Global = require("../helpers/global");

module.exports = () => {
    const result = [];

    /* Add copy plugin */
    const copyData = Global.getCopies();
    if (copyData.length) {
        result.push(
            new CopyPlugin({
                patterns: copyData,
                options: {
                    concurrency: 100,
                },
            })
        );
    }

    result.push(new VueLoaderPlugin());

    result.push(
        new MiniCssExtractPlugin({
            filename: (data) => {
                const name =
                    data.chunk.name.replace("styles_", "styles/") +
                    (Global.devMode ? "" : ".[contenthash]") +
                    ".css";

                return name;
            },
        })
    );

    result.push(
        new EliminateEmptyChunkFilePlugin({
            scriptPattern: /^(styles|images|fonts).*\.m?js$/i,
        })
    );

    result.push(new WebpackAssetsManifest({}));

    return result;
};

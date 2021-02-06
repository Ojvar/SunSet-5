const Path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const configFile = Path.resolve("webpack/tsconfig.json");

module.exports = (devMode) => ({
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".pug", ".json"],

    plugins: [new TsconfigPathsPlugin({ configFile })],

    alias: {
        vue$: "vue/dist/vue.esm.js",
        "@FONTS": Path.resolve("src/frontend/fonts"),
        "@IMAGES": Path.resolve("src/frontend/images"),
        "@SCRIPTS": Path.resolve("src/frontend/scripts"),
        "@STYLES": Path.resolve("src/frontend/styles"),
    },
});

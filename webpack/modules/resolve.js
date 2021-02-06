const Path = require("path");
// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (entries) => ({
    extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".vue",
        ".pug",
        ".json",
        ".scss",
        ".css",
    ],

    // plugins: [
    //     new TsconfigPathsPlugin({
    //         configFile: Path.resolve("webpack/tsconfig.webpack.json"),
    //     }),
    // ],

    alias: {
        vue$: "vue/dist/vue.esm.js",

        "@VueC": Path.resolve("resources/scripts/components"),
    },
});

const Path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const configFile = Path.resolve("webpack/tsconfig.json");

module.exports = (devMode) => ({
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".pug", ".json"],

    // plugins: [new TsconfigPathsPlugin({ baseUrl: "./", configFile })],

    alias: {
        vue$: "vue/dist/vue.esm.js",

        // "@FONTS": Path.resolve("src/frontend/fonts"),
        // "@IMAGES": Path.resolve("src/frontend/images"),
        // "@SCRIPTS": Path.resolve("src/frontend/scripts"),
        // "@STYLES": Path.resolve("src/frontend/styles"),

        // "@FE/Scripts": Path.resolve("src/frontend/scripts"),
        "@FE": Path.resolve("src/frontend"),

        // "@PUBLIC": "dist/public",
        // "@Config": "src/config",
        // "@Routes": "src/routes",
        // "@Lib": "src/lib",

        // "@Core/Helpers": "src/core/helpers",
        // "@Core/Global": "src/core/global",
        // "@Core/Modules": "src/core/modules",
        // "@Core": "src/core",

        // "@BE/Controllers": "src/backend/controllers",
        // "@BE": "src/backend",

        // "@FE/Scripts": "src/frontend/scripts",
        // "@FE/Components": "src/frontend/scripts/components",
        // "@FE": "src/frontend",

        // "@": "src",
    },
});

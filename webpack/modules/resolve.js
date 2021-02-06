const Path = require("path");

module.exports = (devMode) => ({
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".pug", ".json"],

    alias: {
        vue$: "vue/dist/vue.esm.js",

        "@FONTS": Path.resolve("src/frontend/fonts"),
        "@IMAGES": Path.resolve("src/frontend/images"),
        "@SCRIPTS": Path.resolve("src/frontend/scripts"),
        "@STYLES": Path.resolve("src/frontend/styles"),

        "@PUBLIC": Path.resolve("dist/public"),

        "@FE/Scripts": Path.resolve("src/frontend/scripts"),
        "@FE/Components": Path.resolve("src/frontend/scripts/components"),
        "@FE": Path.resolve("src/frontend"),

        "@": Path.resolve("src/"),
    },
});

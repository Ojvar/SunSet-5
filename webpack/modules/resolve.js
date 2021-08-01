const Path = require("path");

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

    alias: {
        vue$: "vue/dist/vue.esm.js",

        /* Core */
        "@": Path.resolve("./"),
        "@CORE": Path.resolve("./core"),

        /* App */
        "@APP": Path.resolve("./app"),
        "@CONTROLLERS": Path.resolve("./app/controllers"),
        "@TYPES": Path.resolve("./lib/types"),
        "@CONFIGS": Path.resolve("./configs"),
        "@Lib": Path.resolve("./lib"),
        "@MODELS": Path.resolve("./models"),

        /* Frontend */
        "@VueC": Path.resolve("./resources/scripts/vue/components"),
        "@ReactC": Path.resolve("./resources/scripts/react/components"),
        "@Scripts": Path.resolve("./resources/scripts"),
        "@Styles": Path.resolve("./resources/styles"),
        "@Fonts": Path.resolve("./resources/fonts"),
        "@Images": Path.resolve("./resources/images"),
    },
});

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
        "@CORE": Path.resolve("./core"),

        /* App */
        "@APP": Path.resolve("./app"),
        "@CONTROLLERS": Path.resolve("./app/controllers"),
        "@TYPES": Path.resolve("./types"),
        "@CONFIGS": Path.resolve("./configs"),

        /* Frontend */
        "@VueC": Path.resolve("./resources/scripts/components"),
        "@Scripts": Path.resolve("./resources/scripts"),
        "@Styles": Path.resolve("./resources/styles"),
        "@Fonts": Path.resolve("./resources/fonts"),
        "@Images": Path.resolve("./resources/images"),
    },
});

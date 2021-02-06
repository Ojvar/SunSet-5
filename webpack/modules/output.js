const Path = require("path");

module.exports = () => ({
    path: Path.resolve("./dist"),
    filename: "[name].js",
});

const Path = require("path");

module.exports = () => ({
    path: Path.resolve("./dist/public"),
    filename: "[name].js",
});

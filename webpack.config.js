const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",

    entry: {
        // index: "./resources/scripts/index.js",
        indexCSS: "./resources/styles/index.css",
    },

    output: {
        publicPath: "./",
        path: __dirname + "/dist",
        filename: "[name].js",
    },

    plugins: [
        new MiniCssExtractPlugin({
            linkType: false,
            filename: "styles/[name].css",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset", // <-- Assets module - asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024, // 8kb
                    },
                },
                generator: {
                    //If emitting file, the file path is
                    filename: "fonts/[name][ext][query]",
                },
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource", //<-- Assets module - asset/resource
                generator: {
                    filename: "images/[name][ext][query]",
                },
            },
            {
                test: /\.js$/,
                use: "babel-loader",
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
        ],
    },
};

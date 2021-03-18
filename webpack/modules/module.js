const Path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Global = require("../helpers/global");

module.exports = () => ({
    rules: [
        {
            test: /\.pug$/i,
            exclude: /node_modules/,
            oneOf: [
                {
                    resourceQuery: /^\?vue/,
                    use: ["pug-plain-loader"],
                },
                {
                    use: ["raw-loader", "pug-plain-loader"],
                },
            ],
        },

        {
            test: /\.vue$/,
            loader: "vue-loader",
        },

        {
            test: /\.js$/,
            loader: "babel-loader",
        },

        {
            test: /\.(png|jpe?g|gif|tiff?)$/i,
            loader: "file-loader",
            options: {
                outputPath: "images",
                name: `[name]${Global.devMode ? "" : ".[contenthash]"}.[ext]`,
            },
            include: [/images/],
        },

        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
            loader: "file-loader",
            options: {
                outputPath: "fonts",
                name: `[name]${Global.devMode ? "" : ".[contenthash]"}.[ext]`,
            },
            include: [/fonts/],
        },

        {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                },
                {
                    loader: "less-loader",
                    options: {
                        sourceMap: Global.devMode,
                    },
                },
            ],
        },

        {
            test: /\.sass$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: Global.devMode,
                    },
                },
            ],
        },

        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: Global.devMode,
                    },
                },
            ],
        },

        {
            test: /\.css$/,
            use: ["vue-style-loader", "css-loader"],
        },

        {
            test: /\.tsx?$/,
            use: {
                loader: "ts-loader",
                options: {
                    configFile: Path.resolve("webpack/tsconfig.webpack.json"),
                    transpileOnly: true,
                },
            },
            exclude: /node_modules/,
        },
    ],
});

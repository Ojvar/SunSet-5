const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (devMode) => ({
    rules: [
        {
            test: /\.m?js$/i,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        },

        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            loader: "file-loader",
            options: {
                publicPath: "/resources",
                outputPath: "resources",
                useRelativePaths: true,
                name(resourcePath, resourceQuery) {
                    return devMode ? "[name].[ext]" : "[name].[hash].[ext]";
                },
            },
        },

        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            loader: "file-loader",
            options: {
                publicPath: "/fonts",
                outputPath: "fonts",
                useRelativePaths: true,
                name(resourcePath, resourceQuery) {
                    return devMode ? "[name].[ext]" : "[name].[hash].[ext]";
                },
            },
        },

        {
            test: /\.styl(us)?$/i,
            oneOf: [
                {
                    resourceQuery: /vue/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: devMode,
                            },
                        },
                        "stylus-loader",
                    ],
                },
                {
                    resourceQuery: /(?!vue)/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: devMode,
                            },
                        },
                        "less-loader",
                    ],
                },
            ],
        },

        {
            test: /\.less$/i,
            oneOf: [
                {
                    resourceQuery: /vue/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: devMode,
                            },
                        },
                        "less-loader",
                    ],
                },
                {
                    resourceQuery: /(?!vue)/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: devMode,
                            },
                        },
                        "less-loader",
                    ],
                },
            ],
        },

        {
            test: /\.(scss|sass|css)$/i,
            oneOf: [
                {
                    resourceQuery: /vue/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: devMode,
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    resourceQuery: /(?!vue)/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: devMode,
                            },
                        },
                        "sass-loader",
                    ],
                },
            ],
        },
        {
            test: /\.pug$/i,
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
            test: /\.vue$/i,
            loader: "vue-loader",
        },

        {
            test: /\.tsx?$/i,
            use: "ts-loader",
            exclude: /node_modules/,
        },

        {
            test: /\.jsx?$/i,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        },
    ],
});

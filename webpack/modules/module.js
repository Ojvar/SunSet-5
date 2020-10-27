"use strict";

/**
 * Export
 */
module.exports = (env = {}) => {
  return {
    rules: getRules(env),
  };
};

/**
 * Get rules
 */
function getRules(env) {
  const isDev = !env.PRODUCTION;
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");

  return [
    {
      test: /\.(scss|sass|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            sourceMap: isDev,
          },
        },
        "sass-loader",
      ],
    },

    {
      test: /\.pug$/,
      oneOf: [
        // this applies to `<template lang="pug">` in Vue components
        {
          resourceQuery: /^\?vue/,
          use: ["pug-plain-loader"],
        },

        // this applies to pug imports inside JavaScript
        {
          use: ["raw-loader", "pug-plain-loader"],
        },
      ],
    },

    {
      test: /\.vue(\.html)?$/,
      loader: "vue-loader",
    },

    {
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader",
      exclude: /node_modules/,
      options: { appendTsSuffixTo: [/\.vue$/] },
    },

    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },

    {
      test: /\.txt$/,
      use: "raw-loader",
    },
  ];
}

// {
//   test: /\.vue\.s[ac]ss$/,
//   use: [
//     "vue-style-loader",
//     {
//       loader: "css-loader",
//       options: {
//         sourceMap: isDev,
//       },
//     },
//     {
//       loader: "sass-loader",
//       options: {},
//     },
//   ],
// },

// {
//   test: /(!\.vue)\.s[ac]ss$/,
//   use: [
//     "vue-style-loader",
//     {
//       loader: "css-loader",
//       options: {
//         sourceMap: isDev,
//       },
//     },
//     {
//       loader: "sass-loader",
//       options: {},
//     },
//   ],
// },

// {
//   test: /\.less$/,
//   use: [
//     "vue-style-loader",
//     {
//       loader: "css-loader",
//       options: {
//         sourceMap: isDev,
//       },
//     },
//     "less-loader",
//   ],
// },

// {
//   test: /\.styl(us)?$/,
//   use: [
//     "vue-style-loader",
//     {
//       loader: "css-loader",
//       options: {
//         sourceMap: isDev,
//       },
//     },
//     "stylus-loader",
//   ],
// },

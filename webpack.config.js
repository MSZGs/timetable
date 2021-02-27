/* eslint-disable */
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: { timetable: "./src/index.ts", "timetable.min": "./src/index.ts" },
  target: "web",
  output: {
    filename: "mszgs.[name].js",
    sourceMapFilename: "mszgs.[name].js.map",
    library: "timetable",
    globalObject: "((a) => {if(a.mszgs === undefined) a.mszgs = {}; return a.mszgs})(this)", // ! It's ugly
    libraryTarget: "umd",
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
      sourceRoot: "src",
      namespace: "mszgs/timetable",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js(\?.*)?$/i,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
};

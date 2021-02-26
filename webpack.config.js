/* eslint-disable */
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: { timetable: "./build/index.js", "timetable.min": "./build/index.js" },
  target: "web",
  output: {
    filename: "mszgs.[name].js",
    sourceMapFilename: "mszgs.[name].js.map",
    library: "timetable",
    globalObject: "((a) => {if(a.mszgs === undefined) a.mszgs = {}; return a.mszgs})(this)", // ! It's ugly
    libraryTarget: "umd",
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js(\?.*)?$/i,
      }),
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.ts",
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets",
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".png", ".svg"],
  },
};

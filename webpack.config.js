const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const babelOptions = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
  },
};

module.exports = {
  name: 'main',
  mode: 'development',
  entry: path.resolve(__dirname, './index'),
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: babelOptions,
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [babelOptions, 'ts-loader'],
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: { exportLocalsConvention: 'camelCase' } },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: (className) => {
                  const classNameWords = className.split('-');
                  if (!classNameWords.length) return className;
                  return [
                    classNameWords[0],
                    classNameWords.slice(1).map(capitalize).join(''),
                  ].join('');
                },
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        use: '@svgr/webpack',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
    new CopyPlugin({
      patterns: [{ from: 'public/_redirects', to: '' }],
    }),
  ],
};

/* eslint @typescript-eslint/no-var-requires: 0 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminWebp = require('imagemin-webp');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let cssHmr = false;
let cssFilename = 'styles-[contenthash].css';
let imageFilename = '[name]-[contenthash].webp';

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/favicon-7b2b909ae59ca59d32fae4656050a4bc.ico',
    inject: 'body',
  }),
];

let additionalClientConfig = {};

let clientConfig = {};
let serverConfig = {};

module.exports = (env = {}) => {
  const { development } = env;

  if (development) {
    cssHmr = true;
    cssFilename = 'styles.css';
    imageFilename = '[name].[ext]';

    additionalClientConfig = {
      mode: 'development',
      devtool: 'source-map',
      watch: true,
      devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
      },
    };
  } else {
    plugins.push(
      new ImageminPlugin({
        test: /\.(jpg|png)$/,
        plugins: [
          imageminWebp({
            quality: 100,
          }),
        ],
      }),
    );
  }

  plugins.push(new MiniCssExtractPlugin({ filename: cssFilename }));

  clientConfig = {
    entry: ['@babel/polyfill', './src/app.tsx'],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: cssHmr,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.(jpg|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets',
                name: imageFilename,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle-[hash].js',
      path: path.join(__dirname, 'build/client'),
      publicPath: '/',
    },
    plugins,
    ...additionalClientConfig,
  };

  if (development) {
    return clientConfig;
  }

  serverConfig = {
    ...clientConfig,
    entry: ['@babel/polyfill', './src/server'],
    output: {
      filename: 'index.js',
      path: path.join(__dirname, 'build/server'),
    },
    target: 'node',
    node: {
      __dirname: false,
    },
    plugins: [new MiniCssExtractPlugin()],
  };

  return [clientConfig, serverConfig];
};

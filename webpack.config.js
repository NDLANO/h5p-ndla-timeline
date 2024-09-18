const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const mode = process.argv.includes('--mode=production') ? 'production' : 'development';

module.exports = {
  entry: {
    bundle: ['./src/index.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /\.module\.scss$/,
      },
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.ttf$/,
        include: path.join(__dirname, 'src/fonts'),
        type: 'asset/resource'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss'],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: mode !== 'production' ? 'static' : 'disabled',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin(),
    ...(mode === 'development' ? [new ReactRefreshWebpackPlugin()] : []), // Add ReactRefreshWebpackPlugin in development mode
  ],
  devServer: {
    hot: true, // Enable hot module replacement
  },
  ...(mode !== 'production' && { devtool: 'eval-cheap-module-source-map' })
};

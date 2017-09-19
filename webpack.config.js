const webpack = require('webpack');
const fs = require('fs');
const mode = process.env.NODE_ENV;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const css_loader_dev = [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader'
  },
  {
    loader: 'postcss-loader'
  }
];

const less_loader_use = [
  {
    loader: 'style-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true
    }
  }
];

const css_loader_prod = ExtractTextPlugin.extract([
  'css-loader',
  'postcss-loader'
]);

const import_options = [
  // {
  //   libraryName: 'antd',
  //   style: true,
  //   css: true
  // }
];

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: '[name].[hash].js',
    chunks: ['main']
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ProvidePlugin({
    'window.jQuery': 'jquery'
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new HtmlWebpackPlugin({
    title: 'hunter webpack start demo',
    filename: 'index.html',
    template: path.resolve(__dirname, 'public/index.ejs'),
    chunks: ['commons', 'main']
  })
];

let css_loader_use = css_loader_dev;

if (mode === 'PROD') {
  plugins = [
    ...plugins,
    new ExtractTextPlugin('styles.css'),
    new BabiliPlugin()
  ];
  css_loader_use = css_loader_prod;
}

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    main: './index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    //外网访问
    disableHostCheck: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: css_loader_use
      },
      {
        test: /\.less$/,
        use: less_loader_use
      },
      {
        test: /\.html/,
        loader: 'art-template-loader'
      },
      {
        test: /\.(ttf|svg|woff2|otf|eot|woff|gif|png|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              'transform-runtime',
              'transform-class-properties',
              ['import', import_options]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'app/assets/css')
    }
  },
  plugins: plugins
};

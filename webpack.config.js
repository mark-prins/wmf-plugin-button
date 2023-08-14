const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const prod = process.env.NODE_ENV === 'production';
const { dependencies } = require('./package.json');
const path = require('path');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'module.js',
    library: 'module',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
    ],
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'ShowTrackingButton',
      filename: 'plugin.js',
      remotes: {},
      exposes: {
        './ShowTracking': './src/ShowTracking.tsx',
      },
      shared: {
        ...dependencies,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
    }),
  ],
};

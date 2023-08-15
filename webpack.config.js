const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const LimitChunkCountPlugin = require('webpack/lib/optimize/LimitChunkCountPlugin');
const prod = process.env.NODE_ENV === 'production';
const { dependencies } = require('./package.json');
const path = require('path');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'plugin.js',
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
      name: 'Plugin_ShowTracking',
      filename: 'module.js',
      remotes: {},
      exposes: {
        Button: './src/ShowTracking.tsx',
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
    new LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

module.exports = {
  entry: './client/index.js',
  output: {
    // path: __dirname,
    filename: './client/public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {}
      }
    ]
  }
};

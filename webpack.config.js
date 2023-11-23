// webpack.config.js

module.exports = {
  // otras configuraciones
  resolve: {
    fallback: {
      crypto: false
    }
  }
};

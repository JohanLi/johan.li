const withImages = require('next-images');

module.exports = withImages({
  future: {
    webpack5: true, // TODO remove once Webpack 5 is used by default
  },
});

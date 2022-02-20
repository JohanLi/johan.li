module.exports = {
  reactStrictMode: true,
  /*
   This disables next/image. A reason for doing this is that I'd already built an Image component,
   and with a zoom feature.
   */
  images: {
    disableStaticImages: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg)$/,
      type: 'asset/resource',
    });

    return config;
  },
};

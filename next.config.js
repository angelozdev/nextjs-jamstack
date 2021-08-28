const { i18n } = require("./next-i18next.config");

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  i18n,
};

module.exports = config;

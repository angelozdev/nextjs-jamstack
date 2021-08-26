/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "es"],
  },
};

module.exports = config;

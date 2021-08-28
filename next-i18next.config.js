const path = require("path");

/**
 * @type {import("next-i18next").UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: "en-US",
    locales: ["es", "en-US"],
  },
  localePath: path.resolve(__dirname, "locales"),
};

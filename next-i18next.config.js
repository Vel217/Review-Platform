const {resolve} = require('path');

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru", "es"],
    localePath: resolve("./public/locales"),
  },
};



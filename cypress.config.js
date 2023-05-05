const { defineConfig } = require("cypress");

module.exports = defineConfig({
  redirectionLimit: 30,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

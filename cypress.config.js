const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  projectId: "1h7gda",
  e2e: {
    defaultCommandTimeout: 10000, // 10 segundos
    pageLoadTimeout: 60000,       // 60 segundos
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      );

      return config;
    },
    specPattern: 'cypress/e2e/features/**/*.feature',
    baseUrl: 'https://demoqa.com',
    cucumber: {
      stepDefinitions: 'cypress/e2e/stepDefinitions/**/*.{js,ts}'
    }
  }
});

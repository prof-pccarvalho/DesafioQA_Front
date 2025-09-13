// cypress/e2e/stepDefinitions/prepareWindowOpen.js

const { Given, When } = require('@badeball/cypress-cucumber-preprocessor');

/**
 * Step genérico para preparar a página para abrir nova janela na mesma aba.
 * Use este step antes de clicar em qualquer botão que abra uma nova janela via window.open.
 */
When('preparo a página para abrir nova janela na mesma aba', () => {
  cy.window().then((win) => {
    if (!win.open.isSinonProxy) {
      cy.stub(win, 'open').callsFake((url) => {
        win.location.href = url;
      });
    }
  });
});

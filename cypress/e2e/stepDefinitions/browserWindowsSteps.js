const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const browserWindowsPage = require('../pageObjects/browserWindowsPage');

/**
 * Step para validar a mensagem na nova janela.
 * @param {string} mensagem - Mensagem esperada.
 */
Then('uma nova janela é aberta e contém a mensagem {string}', (mensagem) => {
  browserWindowsPage.validateSamplePageMessage();
});

/**
 * Step para fechar a nova janela (não aplicável no Cypress, mas mantido para BDD).
 */
Then('o usuário fecha a nova janela', () => {
  // No Cypress, a janela foi aberta na mesma aba, então não há ação extra.
  cy.go('back'); // Opcional: retorna para a página anterior
});

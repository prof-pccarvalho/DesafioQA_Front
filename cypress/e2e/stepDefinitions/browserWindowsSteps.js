const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const browserWindowsPage = require('../pageObjects/browserWindowsPage');

/**
 * Step para acessar a página inicial do DemoQA.
 */
/* Given('que o usuário acessa a página inicial do DemoQA', () => {
  cy.visit('/');
  cy.get('.home-body').should('be.visible');
}); */

/**
 * Step para selecionar o menu principal.
 * @param {string} menu - Nome do menu a ser selecionado.
 */
/* When('seleciona o menu {string}', (menu) => {
  cy.contains('.card-body', menu).should('be.visible').click();
  cy.url().should('include', 'alertsWindows');
});
 */
/**
 * Step para clicar no submenu.
 * @param {string} submenu - Nome do submenu.
 */
/* When('clica no submenu {string}', (submenu) => {
  cy.contains('span', submenu).should('be.visible').click();
  cy.url().should('include', 'browser-windows');
  cy.get('#windowButton').should('be.visible');
}); */

/**
 * Step para clicar no botão de nova janela.
 * @param {string} botao - Nome do botão.
 */
/* When('clica no botão {string}', (botao) => {
  if (botao === 'New Window') {
    browserWindowsPage.clickNewWindowButton();
  }
}); */

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

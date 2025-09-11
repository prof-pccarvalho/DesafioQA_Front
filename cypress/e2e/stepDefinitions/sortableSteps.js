const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const sortablePage = require('../pageObjects/sortablePage');

/**
 * Step para acessar a página inicial do DemoQA.
 */
/* Given('que o usuário acessa a página inicial do DemoQA', () => {
  cy.visit('/');
  cy.get('.home-body').should('be.visible');
});
 */
/**
 * Step para selecionar o menu principal.
 */
/* When('seleciona o menu {string}', (menu) => {
  cy.contains('.card-body', menu).should('be.visible').click();
  cy.url().should('include', 'interaction');
});
 */
/**
 * Step para clicar no submenu.
 */
/* When('clica no submenu {string}', (submenu) => {
  cy.contains('span', submenu).should('be.visible').click();
  cy.url().should('include', 'sortable');
  cy.get('#demo-tabpane-list').should('be.visible');
}); */

/**
 * Step para ordenar os elementos da lista em ordem crescente.
 */
When('ordena os elementos da lista em ordem crescente', () => {
  sortablePage.sortListAscending();
});

/**
 * Step para validar que a lista está em ordem crescente.
 */
Then('a lista deve estar em ordem crescente', () => {
  sortablePage.shouldBeSortedAscending();
});

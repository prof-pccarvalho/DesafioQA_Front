const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const webTablesPage = require('../pageObjects/webTablesPage');

/**
 * Step para acessar a página inicial do DemoQA.
 */
/* Given('que o usuário acessa a página inicial do DemoQA', () => {
  cy.visit('/');
  cy.get('.home-body').should('be.visible');
}); */

/**
 * Step para selecionar o menu principal.
 */
/* When('seleciona o menu {string}', (menu) => {
  cy.contains('.card-body', menu).should('be.visible').click();
  cy.url().should('include', 'elements');
});
 */
/**
 * Step para clicar no submenu.
 */
/* When('clica no submenu {string}', (submenu) => {
  cy.contains('span', submenu).should('be.visible').click();
  cy.url().should('include', 'webtables');
  cy.get('#addNewRecordButton').should('be.visible');
}); */

/**
 * Step para criar um novo registro com dados da tabela.
 */
When('cria um novo registro com os dados:', (dataTable) => {
  const user = dataTable.hashes()[0];
  webTablesPage.clickAddButton();
  webTablesPage.fillAndSubmitForm(user);
});

/**
 * Step para editar um registro pelo email.
 */
When('edita o registro com email {string} para:', (email, dataTable) => {
  const newUser = dataTable.hashes()[0];
  webTablesPage.editRecordByEmail(email, newUser);
});

/**
 * Step para deletar um registro pelo email.
 */
When('deleta o registro com email {string}', (email) => {
  webTablesPage.deleteRecordByEmail(email);
});

/**
 * Step para verificar que um registro não existe.
 */
Then('o registro com email {string} não deve existir', (email) => {
  webTablesPage.shouldNotExist(email);
});

/**
 * Step para criar múltiplos registros a partir de uma tabela.
 */
When('cria os seguintes registros:', (dataTable) => {
  const users = dataTable.hashes();
  webTablesPage.createMultipleRecords(users);
});

/**
 * Step para deletar todos os registros criados.
 */
When('deleta todos os registros criados', function (dataTable) {
  // Pega todos os emails da tabela de dados
  const users = dataTable ? dataTable.hashes() : [];
  const emails = users.map(u => u.email);
  webTablesPage.deleteMultipleRecords(emails);
});

/**
 * Step para verificar que nenhum dos registros existe.
 */
Then('nenhum dos registros criados deve existir', function (dataTable) {
  const users = dataTable.hashes();
  users.forEach(user => {
    webTablesPage.shouldNotExist(user.email);
  });
});

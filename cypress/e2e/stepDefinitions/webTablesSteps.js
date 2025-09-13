const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const webTablesPage = require('../pageObjects/webTablesPage');

/**
 * Step para criar um novo registro com dados da tabela.
 */
When('cria um novo registro com os dados:', (dataTable) => {
  const user = dataTable.hashes()[0];
  webTablesPage.createRecord(user);
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
When('cria os seguintes registros:', function (dataTable) {
  const users = dataTable.hashes();
  webTablesPage.createMultipleRecords(users);
  // Salva os emails no contexto do scenario
  this.createdEmails = users.map(u => u.email);
});


/**
 * Step para deletar todos os registros criados.
 */
When('deleta todos os registros criados', function () {
  // Usa os emails salvos no contexto
  if (this.createdEmails && this.createdEmails.length) {
    webTablesPage.deleteMultipleRecords(this.createdEmails);
  }
});


/**
 * Step para verificar que nenhum dos registros existe.
 */
Then('nenhum dos registros criados deve existir', function () {
  if (this.createdEmails && this.createdEmails.length) {
    this.createdEmails.forEach(email => {
      webTablesPage.shouldNotExist(email);
    });
  }
});


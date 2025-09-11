const webTablesPage = require('./webTablesPage');

describe('WebTablesPage', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('deve criar, editar e deletar um registro', () => {
    const user = {
      firstName: 'Teste',
      lastName: 'QA',
      email: 'teste@exemplo.com',
      age: '25',
      salary: '5000',
      department: 'QA'
    };
    const newUser = {
      firstName: 'Editado',
      lastName: 'Dev',
      email: 'editado@exemplo.com',
      age: '30',
      salary: '6000',
      department: 'Dev'
    };

    webTablesPage.clickAddButton();
    webTablesPage.fillAndSubmitForm(user);

    webTablesPage.editRecordByEmail(user.email, newUser);

    webTablesPage.deleteRecordByEmail(newUser.email);

    webTablesPage.shouldNotExist(newUser.email);
  });

  it('deve criar e deletar múltiplos registros', () => {
    const users = Array.from({ length: 3 }).map((_, i) => ({
      firstName: `User${i + 1}`,
      lastName: 'Test',
      email: `user${i + 1}@ex.com`,
      age: `${20 + i}`,
      salary: `${1000 * (i + 1)}`,
      department: 'QA'
    }));

    webTablesPage.createMultipleRecords(users);
    webTablesPage.deleteMultipleRecords(users.map(u => u.email));
    users.forEach(u => webTablesPage.shouldNotExist(u.email));
  });
});

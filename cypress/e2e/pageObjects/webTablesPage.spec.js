const webTablesPage = require('./webTablesPage');

describe('WebTablesPage - editRecordByEmail', () => {
  beforeEach(() => {
    webTablesPage.visit();
    webTablesPage.createRecord({
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao@exemplo.com',
      age: '30',
      salary: '5000',
      department: 'QA'
    });
  });

  it('deve editar um registro existente, mesmo com scroll horizontal', () => {
    webTablesPage.editRecordByEmail('joao@exemplo.com', {
      firstName: 'Jose',
      lastName: 'Souza',
      email: 'jose@exemplo.com',
      age: '35',
      salary: '6000',
      department: 'Dev'
    });
    webTablesPage.shouldHaveRecord('jose@exemplo.com');
  });
});


describe('WebTablesPage - deleteRecordByEmail', () => {
  beforeEach(() => {
    webTablesPage.visit();
    // Cria o registro para garantir que ele existe
    webTablesPage.createRecord({
      firstName: 'UserDel',
      lastName: 'Test',
      email: 'userdel@ex.com',
      age: '30',
      salary: '5000',
      department: 'QA'
    });
  });

  it('deve deletar um registro existente pelo email', () => {
    webTablesPage.deleteRecordByEmail('userdel@ex.com');
    webTablesPage.shouldNotExist('userdel@ex.com');
  });

  it('não deve falhar ao tentar deletar um registro inexistente', () => {
    webTablesPage.deleteRecordByEmail('naoexiste@ex.com');
    webTablesPage.shouldNotExist('naoexiste@ex.com');
  });
});

const updatedData = {
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice.smith@example.com',
  age: '29',
  salary: '8000',
  department: 'Development'
};

beforeEach(() => {
  webTablesPage.visit();
});

it('should add a new record', () => {
  webTablesPage.createRecord(testData);
  webTablesPage.shouldHaveRecord(testData.email);
});

it('should edit an existing record', () => {
  webTablesPage.editRecordByEmail(testData.email, updatedData);
  cy.contains('div.rt-td', updatedData.lastName).should('exist');
  cy.contains('div.rt-td', updatedData.department).should('exist');
});

it('should delete a record', () => {
  webTablesPage.deleteRecordByEmail(updatedData.email);
  webTablesPage.shouldNotExist(updatedData.email);
});

it('should confirm that a deleted record does not exist', () => {
  webTablesPage.shouldNotExist('user999@ex.com');
});


it('should create and delete multiple records', () => {
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


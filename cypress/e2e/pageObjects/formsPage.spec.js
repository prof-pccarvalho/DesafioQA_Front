const formsPage = require('./formsPage');

describe('FormsPage Page Object', () => {
  beforeEach(() => {
    // Garante que sempre começa na página correta
    formsPage.visit();
  });

  it('deve preencher todos os campos do formulário', () => {
    const user = {
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao.silva@example.com',
      gender: 'Male',
      phone: '11999999999',
      birthDate: '01 Jan 1990',
      subjects: 'Maths',
      hobby: '1',
      address: 'Rua Exemplo, 123',
      state: 'NCR',
      city: 'Delhi'
    };

    formsPage.fillForm(user);

    // Confirma que os campos foram preenchidos corretamente
    cy.get('#firstName').should('have.value', user.firstName);
    cy.get('#lastName').should('have.value', user.lastName);
    cy.get('#userEmail').should('have.value', user.email);
    cy.get(`[name="gender"][value="${user.gender}"]`).should('be.checked');
    cy.get('#userNumber').should('have.value', user.phone);
    cy.get('#dateOfBirthInput').should('have.value', user.birthDate);
    cy.get('.subjects-auto-complete__multi-value__label').should('contain', user.subjects);
    cy.get(`#hobbies-checkbox-${user.hobby}`).should('be.checked');
    cy.get('#currentAddress').should('have.value', user.address);
    cy.get('.css-1uccc91-singleValue').should('contain', user.state);
  });

  it('deve fazer upload de um arquivo', () => {
    formsPage.uploadFile('uploadFile.txt');
    cy.get('#uploadPicture').then($input => {
      expect($input[0].files[0].name).to.equal('uploadFile.txt');
    });
  });

  it('deve submeter o formulário e exibir o popup de confirmação', () => {
    const user = {
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao.silva@example.com',
      gender: 'Male',
      phone: '11999999999',
      birthDate: '01 Jan 1990',
      subjects: 'Maths',
      hobby: '1',
      address: 'Rua Exemplo, 123',
      state: 'NCR',
      city: 'Delhi'
    };

    formsPage.fillForm(user);
    formsPage.uploadFile('uploadFile.txt');
    formsPage.submit();
    formsPage.verifyPopup();
  });

  it('deve fechar o popup de confirmação', () => {
    const user = {
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao.silva@example.com',
      gender: 'Male',
      phone: '11999999999',
      birthDate: '01 Jan 1990',
      subjects: 'Maths',
      hobby: '1',
      address: 'Rua Exemplo, 123',
      state: 'NCR',
      city: 'Delhi'
    };

    formsPage.fillForm(user);
    formsPage.uploadFile('uploadFile.txt');
    formsPage.submit();
    formsPage.verifyPopup();
    formsPage.closePopup();
    cy.get('.modal-content').should('not.exist');
  });
});

const formsPage = require('./formsPage');

describe('FormsPage', () => {
  beforeEach(() => {
    formsPage.visit();
  });

  it('deve preencher a data de nascimento corretamente', () => {
    formsPage.fillBirthDate('10 May 1990');
    cy.get('#dateOfBirthInput').should('have.value', '10 May 1990');
  });

  describe('selectReactSelect', () => {
    it('deve selecionar o Estado corretamente', () => {
      cy.visit('/automation-practice-form');
      formsPage.selectReactSelect('react-select-3-input', 'NCR');
      cy.get('.css-1uccc91-singleValue').should('contain', 'NCR');
    });

    it('deve selecionar a Cidade corretamente', () => {
      cy.visit('/automation-practice-form');
      formsPage.selectReactSelect('react-select-3-input', 'NCR');
      formsPage.selectReactSelect('react-select-4-input', 'Delhi');
      cy.get('.css-1uccc91-singleValue').should('contain', 'Delhi');
    });
  });

  it('deve preencher corretamente o telefone com 10 dígitos', () => {
    formsPage.fillPhone('11987654321'); // 11 dígitos, só os 10 primeiros serão usados
    cy.get('#userNumber').should('have.value', '1198765432');
  });

  it('deve preencher corretamente o telefone com menos de 10 dígitos', () => {
    formsPage.fillPhone('12345');
    cy.get('#userNumber').should('have.value', '12345');
  });


  it('deve preencher o formulário completo', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      phone: '1199999999',
      birthDate: '10 May 1990',
      subjects: 'Maths',
      hobby: '1',
      address: 'Rua Teste, 123',
      state: 'NCR',
      city: 'Delhi'
    };
    formsPage.fillForm(user);
    cy.get('#firstName').should('have.value', user.firstName);
    cy.get('#lastName').should('have.value', user.lastName);
    cy.get('#userEmail').should('have.value', user.email);
    cy.get('#userNumber').should('have.value', user.phone);
    cy.get('#dateOfBirthInput').should('have.value', user.birthDate);
    cy.get('#subjectsInput').should('exist');
    cy.get('#currentAddress').should('have.value', user.address);
    cy.get('.css-1uccc91-singleValue').should('contain', user.city);
  });

  it('deve fazer upload de arquivo', () => {
    formsPage.uploadFile('uploadFile.txt');
    cy.get('#uploadPicture').should('exist');
  });

  it('deve submeter o formulário e exibir o modal', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      phone: '11999999999',
      birthDate: '10 May 1990',
      subjects: 'Maths',
      hobby: '1',
      address: 'Rua Teste, 123',
      state: 'NCR',
      city: 'Delhi'
    };
    formsPage.fillForm(user);
    formsPage.submit();
    formsPage.verifyPopup();
    formsPage.closePopup();
  });

  it('deve fechar o modal de confirmação com robustez', () => {
    formsPage.verifyPopup();
    formsPage.closePopup();
    cy.get('.modal-content').should('not.exist');
  });

});

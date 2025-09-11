/**
 * Page Object para interações com o formulário de prática do DemoQA.
 */
class FormsPage {
  /**
   * Navega até a página do formulário.
   * @returns {void}
   */
  visit() {
    // Visita a página do formulário diretamente
    cy.visit('/automation-practice-form');
  }

  /**
   * Preenche o formulário com os dados fornecidos.
   * @param {Object} user - Objeto com os dados do usuário.
   * @param {string} user.firstName - Primeiro nome.
   * @param {string} user.lastName - Sobrenome.
   * @param {string} user.email - Email.
   * @param {string} user.gender - Gênero.
   * @param {string} user.phone - Telefone.
   * @param {string} user.birthDate - Data de nascimento (ex: '01 Jan 1990').
   * @param {string} user.subjects - Matéria.
   * @param {string} user.hobby - Código do hobby (1, 2, 3).
   * @param {string} user.address - Endereço.
   * @param {string} user.state - Estado.
   * @param {string} user.city - Cidade.
   * @returns {void}
   */
  fillForm(user) {
    // Preenche cada campo do formulário conforme os dados do usuário
    cy.get('#firstName').clear().type(user.firstName);
    cy.get('#lastName').clear().type(user.lastName);
    cy.get('#userEmail').clear().type(user.email);
    cy.get(`[name="gender"][value="${user.gender}"]`).check({ force: true });
    cy.get('#userNumber').clear().type(user.phone);
    cy.get('#dateOfBirthInput').clear().type(user.birthDate + '{enter}');
    cy.get('#subjectsInput').type(user.subjects).type('{enter}');
    cy.get(`#hobbies-checkbox-${user.hobby}`).check({ force: true });
    cy.get('#currentAddress').clear().type(user.address);
    cy.get('#react-select-3-input').type(user.state + '{enter}');
    cy.get('#react-select-4-input').type(user.city + '{enter}');
  }

  /**
   * Realiza o upload de um arquivo no campo de upload.
   * @param {string} fileName - Nome do arquivo presente em cypress/fixtures.
   * @returns {void}
   */
  uploadFile(fileName) {
    // Faz upload do arquivo especificado
    cy.get('#uploadPicture').attachFile(fileName);
  }

  /**
   * Submete o formulário.
   * @returns {void}
   */
  submit() {
    // Clica no botão de submit (forçando o clique caso necessário)
    cy.get('#submit').click({ force: true });
  }

  /**
   * Verifica se o modal de confirmação está visível.
   * @returns {void}
   */
  verifyPopup() {
    // Verifica se o modal de confirmação foi exibido
    cy.get('.modal-content').should('be.visible');
  }

  /**
   * Fecha o modal de confirmação.
   * @returns {void}
   */
  closePopup() {
    // Clica no botão para fechar o modal
    cy.get('#closeLargeModal').click();
  }
}

module.exports = new FormsPage();

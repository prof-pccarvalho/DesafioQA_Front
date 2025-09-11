/**
 * Page Object para interações com a página Web Tables do DemoQA.
 */
class WebTablesPage {
    /**
     * Navega até a página Web Tables.
     * @returns {void}
     */
    visit() {
      cy.visit('/webtables');
    }
  
    /**
     * Clica no botão para adicionar novo registro.
     * @returns {void}
     */
    clickAddButton() {
      cy.get('#addNewRecordButton').should('be.visible').click();
    }
  
    /**
     * Preenche e submete o formulário de novo registro.
     * @param {Object} user - Dados do usuário.
     * @param {string} user.firstName
     * @param {string} user.lastName
     * @param {string} user.email
     * @param {string|number} user.age
     * @param {string|number} user.salary
     * @param {string} user.department
     * @returns {void}
     */
    fillAndSubmitForm(user) {
      // Preenche todos os campos do formulário de registro
      cy.get('#firstName').clear().type(user.firstName);
      cy.get('#lastName').clear().type(user.lastName);
      cy.get('#userEmail').clear().type(user.email);
      cy.get('#age').clear().type(String(user.age));
      cy.get('#salary').clear().type(String(user.salary));
      cy.get('#department').clear().type(user.department);
      cy.get('#submit').click();
    }
  
    /**
     * Edita um registro existente identificado pelo email.
     * @param {string} email - Email do registro a ser editado.
     * @param {Object} newUser - Novos dados do usuário.
     * @returns {void}
     */
    editRecordByEmail(email, newUser) {
      // Localiza o registro pelo email e clica no botão de editar
      cy.contains('.rt-td', email)
        .parent()
        .find('[title="Edit"]')
        .click();
      this.fillAndSubmitForm(newUser);
    }
  
    /**
     * Deleta um registro identificado pelo email.
     * @param {string} email - Email do registro a ser deletado.
     * @returns {void}
     */
    deleteRecordByEmail(email) {
      // Localiza o registro pelo email e clica no botão de deletar
      cy.contains('.rt-td', email)
        .parent()
        .find('[title="Delete"]')
        .click();
    }
  
    /**
     * Verifica se um registro existe na tabela pelo email.
     * @param {string} email - Email a ser verificado.
     * @returns {void}
     */
    shouldNotExist(email) {
      cy.get('.rt-tbody').should('not.contain', email);
    }
  
    /**
     * Cria múltiplos registros a partir de uma lista de usuários.
     * @param {Array<Object>} users - Lista de usuários.
     * @returns {void}
     */
    createMultipleRecords(users) {
      users.forEach(user => {
        this.clickAddButton();
        this.fillAndSubmitForm(user);
      });
    }
  
    /**
     * Deleta múltiplos registros pelo email.
     * @param {Array<string>} emails - Lista de emails a serem deletados.
     * @returns {void}
     */
    deleteMultipleRecords(emails) {
      emails.forEach(email => {
        this.deleteRecordByEmail(email);
      });
    }
  }
  
  module.exports = new WebTablesPage();
  
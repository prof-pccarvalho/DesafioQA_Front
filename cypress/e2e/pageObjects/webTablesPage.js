/**
 * <summary>
 * Page Object para interações com a página Web Tables do DemoQA.
 * Permite criar, editar, deletar e validar registros na tabela.
 * </summary>
 */
class WebTablesPage {
  /**
   * <summary>
   * Navega diretamente até a página Web Tables.
   * </summary>
   * <returns>void</returns>
   */
  visit() {
    cy.visit('/webtables');
  }

  /**
   * <summary>
   * Abre o modal de novo registro clicando no botão "Add".
   * </summary>
   * <returns>void</returns>
   */
  openAddRecordModal() {
    cy.get('#addNewRecordButton').should('be.visible').click();
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
  }

  /**
   * <summary>
   * Preenche e submete o formulário do modal de Web Tables.
   * Aguarda o modal abrir antes de interagir.
   * </summary>
   * @param {Object} data - Dados do registro.
   * @param {string} data.firstName - Primeiro nome.
   * @param {string} data.lastName - Sobrenome.
   * @param {string} data.email - Email.
   * @param {string} data.age - Idade.
   * @param {string} data.salary - Salário.
   * @param {string} data.department - Departamento.
   * @returns {void}
   */
  fillAndSubmitForm(data) {
    // Aguarda o modal do formulário abrir
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    // Preenche os campos do formulário
    cy.get('#firstName').should('be.visible').clear().type(data.firstName);
    cy.get('#lastName').clear().type(data.lastName);
    cy.get('#userEmail').clear().type(data.email);
    cy.get('#age').clear().type(data.age);
    cy.get('#salary').clear().type(data.salary);
    cy.get('#department').clear().type(data.department);
    // Submete o formulário
    cy.get('#submit').click();
  }

  /**
 * <summary>
 * Clique no botão "Adicionar" e preencha o formulário.
 * </summary>
 * @param {Object} data - Dados para o registro.
 * @returns {void}
 */
  createRecord(data) {
    this.openAddRecordModal();
    this.fillAndSubmitForm(data);
  }


  /**
   * <summary>
   * Edita um registro pelo email na tabela do DemoQA.
   * </summary>
   * @param {string} email - Email do registro a ser editado.
   * @param {Object} newData - Novos dados para o registro.
   * @returns {void}
   */
  editRecordByEmail(email, newData) {
    // Localiza a linha pelo email e clica no botão de editar
    // Garante que o registro existe antes de tentar editar
    cy.contains('div.rt-td', email, { timeout: 10000 })
      .should('exist')
      .parents('div.rt-tr')
      .within(() => {
        // Busca o botão de editar pelo id que começa com "edit-record-"
        cy.get('[id^="edit-record-"]')
          .scrollIntoView() // Garante que o botão está na viewport (scroll horizontal)
          .should('be.visible')
          .click({ force: true }); // Usa force se overlays ainda cobrirem o botão
      });

    // Aguarda o modal abrir
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    // Preenche e submete o formulário
    this.fillAndSubmitForm(newData);
  }

  /**
   * <summary>
   * Deleta um registro pelo email na tabela do DemoQA.
   * Aguarda o registro ser removido da tabela.
   * </summary>
   * @param {string} email - Email do registro a ser deletado.
   * @returns {void}
   */
  deleteRecordByEmail(email) {
    // Tenta encontrar o registro pelo email
    cy.get('body').then($body => {
      // Verifica se o registro existe na tabela
      if ($body.find(`div.rt-td:contains("${email}")`).length > 0) {
        // Se existe, clica no botão de deletar correspondente
        cy.contains('div.rt-td', email)
          .parents('div.rt-tr')
          .find('[title="Delete"]')
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true });
        // Aguarda o registro sumir do DOM
        cy.contains('div.rt-td', email, { timeout: 10000 }).should('not.exist');
      } else {
        // Loga que o registro não foi encontrado (já removido)
        cy.log(`Registro com email ${email} não encontrado para deleção.`);
      }
    });
  }

  /**
   * <summary>
   * Valida se um registro existe na tabela pelo email.
   * </summary>
   * @param {string} email - Email do registro.
   * @returns {void}
   */
  shouldHaveRecord(email) {
    cy.contains('div.rt-td', email).should('exist');
  }

  /**
   * <summary>
   * Valida se um registro NÃO existe na tabela pelo email.
   * </summary>
   * @param {string} email - Email do registro.
   * @returns {void}
   */
  shouldNotExist(email) {
    cy.get('body').then($body => {
      // Só valida se o email não está presente em nenhuma célula da tabela
      expect($body.find(`div.rt-td:contains("${email}")`).length).to.eq(0);
    });
  }

  /**
   * Cria múltiplos registros a partir de uma lista de usuários.
   * @param {Array<Object>} users - Lista de usuários.
   * @returns {void}
   */
  createMultipleRecords(users) {
    users.forEach(user => {
      this.createRecord(user);
    });
  }
  /**
   * <summary>
   * Deleta múltiplos registros pelo email, aguardando a remoção de cada um antes de prosseguir.
   * </summary>
   * @param {Array<string>} emails - Lista de emails a serem deletados.
   * @returns {void}
   */
  deleteMultipleRecords(emails) {
    /**
     * Função recursiva para deletar um email por vez e aguardar o DOM.
     * @param {number} idx - Índice do email atual.
     */
    const deleteNext = (idx) => {
      if (idx >= emails.length) return;
      const email = emails[idx];
      // Chama o método robusto para deletar por email
      this.deleteRecordByEmail(email);
      // Aguarda um pequeno tempo para o DOM atualizar antes de seguir
      cy.wait(500).then(() => deleteNext(idx + 1));
    };
    deleteNext(0);
  }
}
module.exports = new WebTablesPage();

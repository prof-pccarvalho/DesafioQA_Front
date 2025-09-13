/* /**
 * Page Object para a página de Browser Windows do DemoQA.
 */
class BrowserWindowsPage {
    /**
     * Navega até a página de Browser Windows.
     * @returns {void}
     */
    visit() {
      cy.visit('/browser-windows');
    }
  
    /**
     * Clica no botão para abrir uma nova janela.
     * @returns {void}
     */
/*     clickNewWindowButton() {
      // Remove o atributo target para abrir na mesma aba, já que o Cypress não manipula múltiplas janelas nativamente.
      cy.get('#windowButton').invoke('removeAttr', 'target').click();
    } */
    clickNewWindowButton() {
      cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
          win.location.href = url;
        });
      });
      cy.get('#windowButton').click();
    }
    
    /**
     * Valida se a mensagem "This is a sample page" está visível na nova janela/aba.
     * @returns {void}
     */
    validateSamplePageMessage() {
      // Verifica se o texto está presente na página
      cy.contains('This is a sample page').should('be.visible');
    }
  }
  
  module.exports = new BrowserWindowsPage();

/**
 * Page Object para interações com a Progress Bar do DemoQA.
 */
class ProgressBarPage {
    /**
     * Navega até a página da Progress Bar.
     * @returns {void}
     */
    visit() {
      cy.visit('/progress-bar');
    }
  
    /**
     * Clica no botão Start/Stop para iniciar ou pausar a barra de progresso.
     * @returns {void}
     */
    clickStartStop() {
      cy.get('#startStopButton').should('be.visible').click();
    }
  
    /**
     * Aguarda até que o valor da barra de progresso atinja ou ultrapasse o valor desejado.
     * @param {number} value - Valor percentual alvo (0-100).
     * @returns {void}
     */
    waitForProgressToReach(value) {
      // Aguarda até que a barra atinja o valor especificado
      cy.get('.progress-bar').should(($el) => {
        const percent = parseInt($el.text());
        // Verifica se o valor atual é maior ou igual ao alvo
        expect(percent).to.be.at.least(value);
      });
    }
  
    /**
     * Aguarda até que o valor da barra de progresso seja menor ou igual ao valor desejado.
     * @param {number} value - Valor percentual alvo (0-100).
     * @returns {void}
     */
    waitForProgressToBeAtMost(value) {
      cy.get('.progress-bar').should(($el) => {
        const percent = parseInt($el.text());
        // Verifica se o valor atual é menor ou igual ao alvo
        expect(percent).to.be.at.most(value);
      });
    }
  
    /**
     * Retorna o valor atual da barra de progresso.
     * @returns {Cypress.Chainable<number>} Valor percentual atual.
     */
    getProgressValue() {
      return cy.get('.progress-bar').invoke('text').then(text => parseInt(text));
    }
  
    /**
     * Clica no botão Reset para reiniciar a barra de progresso.
     * @returns {void}
     */
    clickReset() {
      cy.get('#resetButton').should('be.visible').click();
    }
  }
  
  module.exports = new ProgressBarPage();
  
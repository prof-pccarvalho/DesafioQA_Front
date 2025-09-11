/**
 * Page Object para interações com a página Sortable do DemoQA.
 */
class SortablePage {
    /**
     * Navega até a página Sortable.
     * @returns {void}
     */
    visit() {
      // Visita a página de sortable
      cy.visit('/sortable');
    }
  
    /**
     * Retorna os textos dos itens da lista atual.
     * @returns {Cypress.Chainable<Array<string>>} Lista de textos dos itens.
     */
    getListItems() {
      // Seleciona todos os itens da lista e retorna seus textos em um array
      return cy.get('#demo-tabpane-list .list-group-item').then($items =>
        Cypress._.map($items, el => el.innerText.trim())
      );
    }
  
    /**
     * Ordena os elementos da lista em ordem crescente usando drag and drop.
     * @returns {void}
     */
    sortListAscending() {
      // Obtém os textos dos itens atuais
      this.getListItems().then(items => {
        // Cria uma cópia ordenada dos textos
        const sorted = [...items].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        // Para cada item na ordem desejada, move para a posição correta
        sorted.forEach((text, idx) => {
          // Seleciona o item pelo texto
          cy.get('#demo-tabpane-list .list-group-item').contains(text)
            // Usa o plugin de drag and drop para mover o item para a posição correta
            .drag(`#demo-tabpane-list .list-group-item:nth-child(${idx + 1})`);
        });
      });
    }
  
    /**
     * Verifica se a lista está em ordem crescente.
     * @returns {void}
     */
    shouldBeSortedAscending() {
      // Obtém os textos dos itens e compara com a ordem crescente
      this.getListItems().then(items => {
        const sorted = [...items].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        expect(items).to.deep.equal(sorted);
      });
    }
  }
  
  module.exports = new SortablePage();
  
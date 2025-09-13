/**
 * <summary>
 * Page Object para interações com a página Sortable do DemoQA.
 * Fornece métodos para embaralhar, ordenar e validar a lista usando drag-and-drop robusto.
 * </summary>
 */
class SortablePage {
  /**
   * <summary>
   * Navega até a página Sortable.
   * </summary>
   * <returns>void</returns>
   */
  visit() {
    cy.visit('/sortable');
  }

  /**
   * <summary>
   * Retorna os textos dos itens da lista atual, filtrando vazios e só itens visíveis.
   * </summary>
   * <returns>Cypress.Chainable<Array<string>> Lista de textos dos itens visíveis e não vazios.</returns>
   */
  getListItems() {
    // Aguarda até que todos os itens estejam visíveis e lê apenas os textos não vazios
    return cy.get('#demo-tabpane-list .list-group-item:visible', { timeout: 10000 })
      .filter((i, el) => !!el.innerText.trim() && !el.classList.contains('placeholder'))
      .then($items =>
        Cypress._.map($items, el => el.innerText.trim())
      );
  }

  /**
   * <summary>
   * Embaralha (desordena) a lista usando drag-and-drop robusto.
   * Garante que a ordem realmente mude em relação à inicial.
   * </summary>
   * <returns>void</returns>
   */
  shuffleList() {
    this.getListItems().then(items => {
      let shuffled;
      // Gera uma ordem embaralhada diferente da original
      do {
        shuffled = [...items];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
      } while (shuffled.join() === items.join());

      /**
       * Função recursiva para realizar drag-and-drop sequencialmente.
       * @param {number} idx - Índice atual do item a ser movido.
       */
      const dragNext = (idx) => {
        if (idx >= shuffled.length) {
          // Aguarda até que todos os itens estejam presentes após o shuffle
          cy.get('#demo-tabpane-list .list-group-item:visible', { timeout: 8000 })
            .should('have.length', shuffled.length);
          return;
        }
        const text = shuffled[idx];

        // Executa o drag-and-drop robusto para a posição desejada
        cy.robustDragAndDrop(
          '#demo-tabpane-list .list-group-item:contains("' + text + '")',
          `#demo-tabpane-list .list-group-item:nth-child(${idx + 1})`
        );
        // Aguarda o DOM estabilizar antes do próximo drag
        cy.get('#demo-tabpane-list .list-group-item:visible', { timeout: 8000 })
          .should('have.length', shuffled.length)
          .then(() => dragNext(idx + 1));
      };

      dragNext(0);
    });
  }

  /**
   * <summary>
   * Ordena a lista para a ordem desejada, movendo apenas itens fora do lugar.
   * </summary>
   * <param name="expectedOrder">Ordem desejada dos itens.</param>
   * <returns>void</returns>
   */
  sortListToOrder(expectedOrder) {
    this.getListItems().then(currentOrder => {
      let order = [...currentOrder];
      /**
       * Função recursiva para mover itens para a posição correta.
       * @param {number} idx - Índice alvo da ordenação.
       */
      const moveNext = (idx) => {
        if (idx >= expectedOrder.length) {
          cy.get('#demo-tabpane-list .list-group-item:visible', { timeout: 8000 })
            .should('have.length', expectedOrder.length);
          return;
        }
        const expectedText = expectedOrder[idx];
        const currentIdx = order.indexOf(expectedText);

        if (currentIdx !== idx) {

          cy.robustDragAndDrop(
            '#demo-tabpane-list .list-group-item:contains("' + expectedText + '")',
            `#demo-tabpane-list .list-group-item:nth-child(${idx + 1})`
          );
          // Atualiza a ordem localmente
          order.splice(currentIdx, 1);
          order.splice(idx, 0, expectedText);
          cy.get('#demo-tabpane-list .list-group-item:visible', { timeout: 8000 })
            .should('have.length', expectedOrder.length)
            .then(() => moveNext(idx + 1));
        } else {
          moveNext(idx + 1);
        }
      };
      moveNext(0);
    });
  }

  /**
   * <summary>
   * Verifica se a lista está em ordem crescente.
   * </summary>
   * <param name="expectedOrder">Ordem esperada.</param>
   * <returns>void</returns>
   */
  shouldBeSorted(expectedOrder) {
    cy.get('#demo-tabpane-list .list-group-item:visible', { timeout: 8000 })
      .should('have.length', expectedOrder.length)
      .then($items => {

        const items = Cypress._.map($items, el => el.innerText.trim());
        cy.log('Itens atuais:', JSON.stringify(items));
        cy.log('Itens esperados:', JSON.stringify(expectedOrder));
        expect(items).to.deep.equal(expectedOrder);
      });
  }

  /**
   * <summary>
   * Verifica se a lista NÃO está em ordem crescente.
   * </summary>
   * <param name="expectedOrder">Ordem esperada.</param>
   * <returns>void</returns>
   */
  shouldNotBeSorted(expectedOrder) {
    cy.get('#demo-tabpane-list .list-group-item:visible', { timeout: 8000 })
      .should('have.length', expectedOrder.length)
      .then($items => {

        const items = Cypress._.map($items, el => el.innerText.trim());
        cy.log('Itens atuais:', JSON.stringify(items));
        cy.log('Itens esperados:', JSON.stringify(expectedOrder));
        expect(items).to.not.deep.equal(expectedOrder);
      });
  }
}

module.exports = new SortablePage();

import 'cypress-file-upload';
import '@4tw/cypress-drag-drop';
// Adicione comandos customizados aqui
/**
 * <summary>
 * Performs a robust drag-and-drop operation between two elements using explicit event triggers.
 * </summary>
 * <param name="sourceSelector">CSS selector for the element to be dragged.</param>
 * <param name="targetSelector">CSS selector for the element to be dropped onto.</param>
 * <returns>void</returns>
 */
Cypress.Commands.add('robustDragAndDrop', (sourceSelector, targetSelector) => {
    // Garante que o elemento de origem está visível e dispara os eventos de drag
    cy.get(sourceSelector, { timeout: 10000 })
      .should('exist')
      .then($source => {
        // If not visible, force the drag (as a last resort).
        cy.wrap($source)
        .trigger('mousedown', { which: 1, force: true })
        .trigger('dragstart', { force: true });
        // Garante que o elemento de destino está visível e dispara os eventos de drop
        cy.get(targetSelector, { timeout: 10000 })
        .should('exist')
        .then($target => {
          cy.wrap($target)
            .trigger('mousemove', { force: true })
            .trigger('dragover', { force: true })
            .trigger('drop', { force: true })
            .trigger('mouseup', { force: true });
        });
});
    // Aguarda o DOM estabilizar após a operação
    cy.wait(800);
  });

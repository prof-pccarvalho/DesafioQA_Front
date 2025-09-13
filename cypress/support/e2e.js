import './commands';
require('@4tw/cypress-drag-drop');

    /**
   * Handles uncaught exceptions from cross-origin scripts.
   * Returns false to prevent Cypress from failing the test in these cases.
   * @param {Error} err - The captured error.
   * @param {Runnable} runnable - The test context.
   * @returns {boolean} false to ignore the error if it is from an external script.
   */
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora erros de scripts externos (cross-origin)
    if (err.message && err.message.includes('Script error')) {
      return false;
    }
    // Para outros erros, deixe o Cypress falhar normalmente
  });
  
  
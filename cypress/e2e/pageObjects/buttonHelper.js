/**
 * Helper para mapear nomes de botões para seletores CSS.
 * @param {string} botao - Nome do botão.
 * @returns {string|undefined} Seletor CSS correspondente.
 */
function getButtonSelector(botao) {
    const buttonSelectors = {
      'New Window': '#windowButton',
      'Start': '#startStopButton',
      'Start novamente': '#startStopButton',
      'Reset': '#resetButton',
    };
    return buttonSelectors[botao];
  }
  
  module.exports = { getButtonSelector };
  
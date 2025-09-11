/**
 * Arquivo de steps comuns para todos os cenários do projeto DemoQA.
 * Inclui steps genéricos como acessar a home, selecionar menus e submenus.
 */

const { Given, When } = require('@badeball/cypress-cucumber-preprocessor');

/**
 * Step para acessar a página inicial do DemoQA.
 * @function
 * @returns {void}
 */
Given('que o usuario acessa a pagina inicial do DemoQA', () => {
  // Navega até a baseUrl definida no cypress.config.js
  cy.visit('/');
  // Confirma que a home foi carregada
  cy.get('.home-body').should('be.visible');
});

/**
 * Step para selecionar um menu principal pelo texto.
 * @function
 * @param {string} menu - Nome do menu a ser selecionado.
 * @returns {void}
 */
When('seleciona o menu {string}', (menu) => {
  // Procura o card do menu pelo texto e clica
  cy.contains('.card-body', menu).should('be.visible').click();
  // Valida que a URL mudou (opcional, pode customizar para cada menu)
  // cy.url().should('include', menu.toLowerCase().replace(/\s/g, ''));
});

/**
 * Step para clicar em um submenu pelo texto.
 * @function
 * @param {string} submenu - Nome do submenu.
 * @returns {void}
 */
When('clica no submenu {string}', (submenu) => {
  // Procura o submenu pelo texto e clica
  cy.contains('span', submenu).should('be.visible').click();
});

/**
 * Step genérico para clicar em botões de acordo com o nome.
 * Suporta botões como "New Window" e "Start" usados em diferentes features.
 * @function
 * @param {string} botao - Nome do botão a ser clicado.
 * @returns {void}
 */
When('clica no botão {string}', (botao) => {
  // Mapeamento dos nomes dos botões para seus seletores
  const buttonSelectors = {
    'New Window': '#windowButton',        // Browser Windows
    'Start': '#startStopButton',          // Progress Bar
    'Start novamente': '#startStopButton',// Progress Bar (reutiliza o mesmo botão)
    'Reset': '#resetButton',              // Progress Bar
    // Adicione outros botões conforme necessário
  };

  // Seleciona o seletor correspondente ao nome do botão
  const selector = buttonSelectors[botao];

  if (selector) {
    // Para o botão "New Window", remove o target para abrir na mesma aba (Cypress limitação)
    if (botao === 'New Window') {
      cy.get(selector).should('be.visible').invoke('removeAttr', 'target').click();
    } else {
      cy.get(selector).should('be.visible').click();
    }
  } else {
    // Se não encontrar o botão, lança erro claro
    throw new Error(`Botão "${botao}" não mapeado em commonSteps.js`);
  }
});


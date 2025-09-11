const browserWindowsPage = require('./browserWindowsPage');

describe('BrowserWindowsPage', () => {
  beforeEach(() => {
    cy.visit('/browser-windows');
  });

  it('deve clicar no botão e validar a mensagem da nova janela', () => {
    browserWindowsPage.clickNewWindowButton();
    browserWindowsPage.validateSamplePageMessage();
  });
});

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import formsPage from '../pageObjects/formsPage';

/**
 * Step para acessar a página inicial do DemoQA.
 * Confirma que o título da página inicial está presente após o acesso.
 */
/* Given('que o usuario acessa a pagina inicial do DemoQA', () => {
  cy.visit('/'); // Acessa a baseUrl definida no cypress.config.js
  // Confirma que a página inicial foi carregada (título "DEMOQA" visível)
  cy.get('.home-body').should('be.visible');
}); */

/**
 * Step para selecionar o menu principal pelo texto.
 * @param {string} menu - Nome do menu a ser selecionado.
 * Confirma que o menu está visível e foi clicado.
 */
/* When('seleciona o menu {string}', (menu) => {
  // Garante que o menu está visível antes de clicar
  cy.contains('.card-body', menu).should('be.visible').click();
  // Confirma que a navegação para o menu ocorreu (URL mudou)
  cy.url().should('include', menu.toLowerCase());
}); */

/**
 * Step para clicar no submenu pelo texto.
 * @param {string} submenu - Nome do submenu a ser clicado.
 * Confirma que o submenu está visível e foi clicado.
 */
/* When('clica no submenu {string}', (submenu) => {
  // Garante que o submenu está visível antes de clicar
  cy.contains('span', submenu).should('be.visible').click();
  // Confirma que a navegação para o formulário ocorreu (URL mudou)
  cy.url().should('include', 'automation-practice-form');
  // Confirma que o formulário está visível
  cy.get('form').should('be.visible');
}); */

/**
 * Step para preencher todos os campos do formulário com dados aleatórios.
 * Confirma que cada campo foi preenchido corretamente.
 */
When('preenche todos os campos do formulario com dados aleatorios', () => {
  cy.fixture('randomUser').then(user => {
    formsPage.fillForm(user);

    // Confirmação de cada campo preenchido
    cy.get('#firstName').should('have.value', user.firstName);
    cy.get('#lastName').should('have.value', user.lastName);
    cy.get('#userEmail').should('have.value', user.email);
    cy.get(`[name="gender"][value="${user.gender}"]`).should('be.checked');
    cy.get('#userNumber').should('have.value', user.phone);
    cy.get('#dateOfBirthInput').should('have.value', user.birthDate);
    cy.get('.subjects-auto-complete__multi-value__label').should('contain', user.subjects);
    cy.get(`#hobbies-checkbox-${user.hobby}`).should('be.checked');
    cy.get('#currentAddress').should('have.value', user.address);
    cy.get('.css-1uccc91-singleValue').should('contain', user.state);
    cy.get('.css-1wa3eu0-placeholder').should('not.exist'); // Placeholder sumiu após seleção
  });
});

/**
 * Step para fazer upload de um arquivo .txt.
 * Confirma que o nome do arquivo aparece após o upload.
 */
When('faz upload de um arquivo .txt', () => {
  cy.get('#uploadPicture').attachFile('uploadFile.txt');
  // Confirma que o nome do arquivo aparece ao lado do campo de upload
  cy.get('#uploadPicture').then($input => {
    expect($input[0].files[0].name).to.equal('uploadFile.txt');
  });
});

/**
 * Step para submeter o formulário.
 * Confirma que o botão de submit foi clicado e o modal está sendo carregado.
 */
When('submete o formulario', () => {
  formsPage.submit();
  // Confirma que o modal de confirmação está sendo exibido (aguarda o modal aparecer)
  cy.get('.modal-content').should('be.visible');
});

/**
 * Step para verificar se o popup de confirmação é exibido.
 * Confirma que o modal está visível e contém o texto esperado.
 */
Then('um popup de confirmacao e exibido', () => {
  formsPage.verifyPopup();
  // Confirma que o modal contém o título de confirmação
  cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');
});

/**
 * Step para fechar o popup de confirmação.
 * Confirma que o modal foi fechado.
 */
Then('o usuario fecha o popup', () => {
  formsPage.closePopup();
  // Confirma que o modal não está mais visível
  cy.get('.modal-content').should('not.exist');
});

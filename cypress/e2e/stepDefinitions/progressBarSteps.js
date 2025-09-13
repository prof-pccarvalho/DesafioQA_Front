const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const progressBarPage = require('../pageObjects/progressBarPage');

/**
 * Step para pausar a barra antes de atingir 25%.
 */
When('para a barra antes de atingir 25%', () => {
  // Aguarda até a barra atingir pelo menos 10% e para antes de 25%
  cy.wait(500); // Pequeno delay para garantir início
  progressBarPage.getProgressValue().then((value) => {
    if (value < 25) {
      progressBarPage.clickStartStop();
    }
  });
});

/**
 * Step para validar que a barra está em até 25%.
 */
Then('o valor da progress bar deve ser menor ou igual a 25%', () => {
  progressBarPage.waitForProgressToBeAtMost(25);
});

/**
 * Step para clicar no botão Start novamente.
 */
When('clica no botão "Start" novamente', () => {
  progressBarPage.clickStartStop();
});

/**
 * Step para aguardar até a barra atingir 100%.
 */
When('aguarda até a barra atingir 100%', () => {
  progressBarPage.waitForProgressToReach(100, 20000);
});

/**
 * Step para resetar a barra de progresso.
 */
When('reseta a progress bar', () => {
  progressBarPage.clickReset();
  // Confirma que a barra voltou para 0%
  progressBarPage.waitForProgressToBeAtMost(0);
});

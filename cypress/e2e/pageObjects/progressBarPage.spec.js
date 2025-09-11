const progressBarPage = require('./progressBarPage');

describe('ProgressBarPage', () => {
  beforeEach(() => {
    cy.visit('/progress-bar');
  });

  it('deve iniciar e pausar a barra antes de 25%', () => {
    progressBarPage.clickStartStop();
    cy.wait(500);
    progressBarPage.getProgressValue().then((value) => {
      if (value < 25) {
        progressBarPage.clickStartStop();
      }
      progressBarPage.waitForProgressToBeAtMost(25);
    });
  });

  it('deve completar a barra até 100% e resetar', () => {
    progressBarPage.clickStartStop();
    progressBarPage.waitForProgressToReach(100);
    progressBarPage.clickReset();
    progressBarPage.waitForProgressToBeAtMost(0);
  });
});

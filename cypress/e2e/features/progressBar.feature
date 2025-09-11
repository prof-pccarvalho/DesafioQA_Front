Feature: Controle da Progress Bar no DemoQA

  Scenario: Controlar e validar o progresso da barra
    Given que o usuario acessa a pagina inicial do DemoQA
    When seleciona o menu "Widgets"
    And clica no submenu "Progress Bar"
    And clica no botão "Start"
    And para a barra antes de atingir 25%
    Then o valor da progress bar deve ser menor ou igual a 25%
    When clica no botão "Start" novamente
    And aguarda até a barra atingir 100%
    And reseta a progress bar

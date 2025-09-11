Feature: Preencher formulario DemoQA

  Scenario: Usuario preenche e submete o formulario com dados aleatorios
  Given que o usuario acessa a pagina inicial do DemoQA
    When seleciona o menu "Forms"
    And clica no submenu "Practice Form"
    And preenche todos os campos do formulario com dados aleatorios
    And faz upload de um arquivo .txt
    And submete o formulario
    Then um popup de confirmacao e exibido
    And o usuario fecha o popup

Feature: Testar nova janela em Browser Windows
  @browserWindows
  Scenario: Abrir e validar nova janela
    Given que o usuario acessa a pagina inicial do DemoQA
    When seleciona o menu "Alerts, Frame & Windows"
    And clica no submenu "Browser Windows"
    And preparo a página para abrir nova janela na mesma aba
    And clica no botão "New Window"
    Then uma nova janela é aberta e contém a mensagem "This is a sample page"
    And o usuário fecha a nova janela

Feature: Ordenar elementos com drag and drop no DemoQA

  Scenario: Ordenar lista em ordem crescente
    Given que o usuario acessa a pagina inicial do DemoQA
    When seleciona o menu "Interactions"
    And clica no submenu "Sortable"
    And ordena os elementos da lista em ordem crescente
    Then a lista deve estar em ordem crescente

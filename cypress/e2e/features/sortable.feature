Feature: Ordenar elementos com drag and drop no DemoQA

    Scenario: Desordenar e reordenar a lista em ordem crescente
    Given que o usuario acessa a pagina inicial do DemoQA
    When seleciona o menu "Interactions"
    And clica no submenu "Sortable"
    When desordena os elementos da lista
    Then a lista não deve estar em ordem crescente
    And ordena os elementos da lista em ordem crescente
    Then a lista deve estar em ordem crescente


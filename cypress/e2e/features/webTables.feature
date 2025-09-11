Feature: Gerenciar registros na Web Tables do DemoQA

  Scenario: Criar, editar e deletar um registro
    Given que o usuario acessa a pagina inicial do DemoQA
    When seleciona o menu "Elements"
    And clica no submenu "Web Tables"
    And cria um novo registro com os dados:
      | firstName | lastName | email              | age | salary | department |
      | João      | Silva    | joao@exemplo.com   | 30  | 5000   | QA         |
    And edita o registro com email "joao@exemplo.com" para:
      | firstName | lastName | email              | age | salary | department |
      | Jose      | Souza    | jose@exemplo.com   | 35  | 6000   | Dev        |
    And deleta o registro com email "jose@exemplo.com"
    Then o registro com email "jose@exemplo.com" nao deve existir

  Scenario: Criar 12 registros dinamicamente e deletar todos
    Given que o usuario acessa a pagina inicial do DemoQA
    When seleciona o menu "Elements"
    And clica no submenu "Web Tables"
    And cria os seguintes registros:
      | firstName | lastName | email             | age | salary | department |
      | User1     | Teste    | user1@ex.com      | 21  | 1000   | QA         |
      | User2     | Teste    | user2@ex.com      | 22  | 2000   | QA         |
      | User3     | Teste    | user3@ex.com      | 23  | 3000   | QA         |
      | User4     | Teste    | user4@ex.com      | 24  | 4000   | QA         |
      | User5     | Teste    | user5@ex.com      | 25  | 5000   | QA         |
      | User6     | Teste    | user6@ex.com      | 26  | 6000   | QA         |
      | User7     | Teste    | user7@ex.com      | 27  | 7000   | QA         |
      | User8     | Teste    | user8@ex.com      | 28  | 8000   | QA         |
      | User9     | Teste    | user9@ex.com      | 29  | 9000   | QA         |
      | User10    | Teste    | user10@ex.com     | 30  | 10000  | QA         |
      | User11    | Teste    | user11@ex.com     | 31  | 11000  | QA         |
      | User12    | Teste    | user12@ex.com     | 32  | 12000  | QA         |
    And deleta todos os registros criados
    Then nenhum dos registros criados deve existir

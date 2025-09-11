DesafioQA_Front
Automação de testes end-to-end do site DemoQA utilizando Cypress, Cucumber (BDD) e o padrão Page Object Model.
O projeto cobre cenários de preenchimento de formulário, upload de arquivos, validação de popups, manipulação de tabelas, widgets, drag-and-drop, entre outros.

Sumário
Sobre o Projeto
Tecnologias Utilizadas
Pré-requisitos
Instalação
Estrutura do Projeto
Execução dos Testes
Padrões e Boas Práticas
Documentação e Comentários
Testes Unitários
Contribuindo
Licença
Sobre o Projeto
Este projeto foi desenvolvido como parte de um desafio técnico para automação de testes frontend. O objetivo é demonstrar habilidades em automação utilizando Cypress, integração com Cucumber para BDD, organização do código com Page Object Model, uso de dados dinâmicos via fixtures e cobertura de cenários complexos de UI.

Tecnologias Utilizadas
Cypress (v12.17.4)
Cucumber BDD via @badeball/cypress-cucumber-preprocessor (v15.x)
@bahmutov/cypress-esbuild-preprocessor (v2.2.5)
esbuild (v0.17.x)
cypress-file-upload
@4tw/cypress-drag-drop
Node.js (recomendado: v16.x)
Pré-requisitos
Node.js instalado (download aqui)
npm (incluso no Node.js)
Git (opcional, para versionamento)
Instalação
Clone o repositório:

bash

git clone https://github.com/seuusuario/DesafioQA_Front.git
cd DesafioQA_Front
Instale as dependências do projeto:

bash

npm install
Estrutura do Projeto
text

DesafioQA_Front/
├── cypress/
│   ├── cypress.config.js
│   ├── downloads/
│   ├── e2e/
│   │   ├── features/           # Arquivos .feature (Cucumber)
│   │   ├── pageObjects/        # Page Objects (POM) + testes unitários
│   │   └── stepDefinitions/    # Step Definitions (Cucumber)
│   ├── fixtures/               # Dados de teste e arquivos para upload
│   ├── screenshots/            # Evidências de execução
│   └── support/                # Comandos customizados e setup
├── cypress.config.js           # Configuração do Cypress
├── package.json                # Dependências e scripts
├── README.md                   # Este arquivo
Execução dos Testes
Modo Interativo (GUI)
bash

npx cypress open
Selecione o cenário desejado no Test Runner.

Modo Headless (Terminal)
bash

npx cypress run
Padrões e Boas Práticas
Page Object Model:
Encapsula interações com páginas, facilitando manutenção e reutilização.
BDD com Cucumber:
Cenários de teste em linguagem natural, próximos da linguagem de negócio.
Fixtures:
Dados de teste centralizados e reutilizáveis.
Comandos customizados:
Centralizam ações repetitivas.
Testes unitários:
Todos os métodos de Page Objects possuem testes unitários dedicados.
Documentação XML/JSDoc:
Todos os métodos e classes possuem documentação detalhada, facilitando entendimento e manutenção.
Comentários inline:
Explicam cada passo significativo do código.
Documentação e Comentários
Todos os métodos e classes possuem comentários XML/JSDoc detalhando propósito, parâmetros e retorno.
Comentários inline explicam cada lógica relevante, validações, seletores e decisões de implementação.
Exemplo de documentação:
js

/**
 * Preenche o formulário com os dados fornecidos.
 * @param {Object} user - Objeto com os dados do usuário.
 * @returns {void}
 */
fillForm(user) { ... }
Testes Unitários
Todos os métodos dos Page Objects possuem arquivos de teste unitário dedicados (ex: formsPage.spec.js).
Os testes unitários cobrem:
Preenchimento de campos
Upload de arquivos
Submissão de formulários
Validação de popups
Fluxos de CRUD em tabelas
Drag-and-drop
Execute os testes unitários junto com os testes E2E via Cypress.
Contribuindo
Fork este repositório
Crie uma branch para sua feature (git checkout -b minha-feature)
Commit suas alterações (git commit -am 'Adiciona nova feature')
Push para a branch (git push origin minha-feature)
Abra um Pull Request
Licença
Este projeto está sob a licença MIT.

Observações Finais
O arquivo para upload está em /cypress/fixtures/uploadFile.txt.
Todos os métodos e classes do projeto possuem documentação XML/JSDoc e comentários inline detalhados.
Testes unitários são obrigatórios para todos os métodos dos Page Objects.
Para dúvidas, sugestões ou problemas, abra uma issue ou entre em contato pelo GitHub.
Se precisar de um modelo de README em inglês, exemplos de testes unitários ou documentação para métodos específicos, só pedir!
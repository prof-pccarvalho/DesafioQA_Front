

---

# 📌📚 Documentação Completa do Projeto Cypress + Cucumber DemoQA

---

## 📚 Sumário
- [Visão Geral do Projeto]
- [Estrutura de Pastas e Arquivos]
- [Features Implementadas]
- [Page Objects (POs)]
- [Step Definitions]
- [Fixtures]
- [Support]
- [Unit Tests]
- [Passo a Passo para Criar o Projeto do Zero]
- [Boas Práticas e Observações]

---

1. Visão Geral do Projeto
Este projeto automatiza cenários E2E do site DemoQA utilizando Cypress 12.x, Cucumber (Gherkin), Page Objects, comandos customizados e plugins para drag-and-drop e upload de arquivos.
O objetivo é garantir a robustez, legibilidade e manutenibilidade dos testes, seguindo padrões profissionais de documentação e cobertura de código.

---

2. Estrutura de Pastas e Arquivos
text

cypress/
├── e2e/
│   ├── features/           # Arquivos .feature (Gherkin)
│   ├── pageObjects/        # Page Objects (POs) - um por componente/feature
│   ├── stepDefinitions/    # Step Definitions (steps do Cucumber)
├── fixtures/               # Dados de teste (JSON, arquivos para upload)
├── support/
│   ├── commands.js         # Comandos customizados Cypress
│   ├── e2e.js              # Configurações globais, handlers de exceção etc.
├── downloads/              # Downloads gerados pelos testes
├── screenshots/            # Prints automáticos de falhas
├── videos/                 # Vídeos automáticos das execuções
cypress.config.js           # Configuração principal do Cypress

---

3. Features Implementadas
forms.feature
Preenchimento completo do formulário DemoQA (incluindo datepicker, selects customizados, upload, hobbies, etc).
Validação do modal de confirmação.
progressBar.feature
Início, pausa e reset da barra de progresso.
Validação de progresso em diferentes percentuais.
sortable.feature
Drag-and-drop para ordenar e desordenar listas.
Validação da ordem dos elementos.
browserWindows.feature
Abertura de nova janela e validação do conteúdo.
webTables.feature
Criação, edição e deleção de registros na tabela.
Criação e deleção em massa de registros.
Validação da presença/ausência de registros.

---

4. Page Objects (POs)
Todos os POs seguem o padrão:

XML documentation em todas as classes e métodos.
Comentários detalhados explicando cada passo relevante.
Unit tests para todos os métodos.
Exemplo de métodos típicos em um PO:
js

/**
 * <summary>
 * Preenche e submete o formulário do modal de Web Tables.
 * Aguarda o modal abrir antes de interagir.
 * </summary>
 * @param {Object} data - Dados do registro.
 * @returns {void}
 */
fillAndSubmitForm(data) {
  cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
  cy.get('#firstName').should('be.visible').clear().type(data.firstName);
  // ... outros campos ...
  cy.get('#submit').click();
}
POs existentes:
formsPage.js
progressBarPage.js
sortablePage.js
browserWindowsPage.js
webTablesPage.js

---

5. Step Definitions
Cada feature tem um arquivo de stepDefinitions correspondente.
Steps genéricos (ex: navegação, clique em menus) ficam em commonSteps.js.
Steps específicos (ex: criar registro, editar, deletar) ficam em arquivos por feature.
Exemplo:
js

When('cria um novo registro com os dados:', (dataTable) => {
  const user = dataTable.hashes()[0];
  webTablesPage.createRecord(user);
});

---

6. Fixtures
randomUser.json: Dados dinâmicos para testes de cadastro.
uploadFile.txt: Arquivo para testes de upload.
users.json: Lista de usuários para testes em massa.

---

7. Support
commands.js
Comandos customizados como drag-and-drop robusto, upload, etc.
Exemplo:
js

Cypress.Commands.add('robustDragAndDrop', (sourceSelector, targetSelector) => {
  cy.get(sourceSelector).scrollIntoView().should('be.visible').trigger('mousedown', { which: 1, force: true });
  cy.get(targetSelector).scrollIntoView().should('be.visible').trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
  cy.wait(800);
});
e2e.js
Importação de comandos customizados.
Handler para ignorar erros de scripts externos:
js

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message && err.message.includes('Script error')) {
    return false;
  }
});

---

8. Unit Tests
Todos os métodos dos POs possuem unit tests em arquivos .spec.js dentro de pageObjects.
Exemplo:
js

it('deve deletar um registro existente pelo email', () => {
  webTablesPage.deleteRecordByEmail('userdel@ex.com');
  webTablesPage.shouldNotExist('userdel@ex.com');
});

---

9. Passo a Passo para Criar o Projeto do Zero
Pré-requisitos
Node.js >= 14.x
npm >= 6.x
1. Inicialize o projeto
bash

npm init -y
2. Instale as dependências
bash

npm install cypress@12.17.4 @badeball/cypress-cucumber-preprocessor@15.1.5 @bahmutov/cypress-esbuild-preprocessor@2.2.5 @4tw/cypress-drag-drop@2.3.0 cypress-file-upload@5.0.8 esbuild@0.17.19 --save-dev
3. Estruture as pastas
bash

mkdir -p cypress/e2e/features cypress/e2e/pageObjects cypress/e2e/stepDefinitions cypress/fixtures cypress/support
4. Configure o Cypress + Cucumber
Crie ou ajuste cypress.config.js:
js

const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
    specPattern: 'cypress/e2e/features/**/*.feature',
    baseUrl: 'https://demoqa.com',
    cucumber: {
      stepDefinitions: 'cypress/e2e/stepDefinitions/**/*.{js,ts}'
    }
  }
});
5. Importe plugins e comandos em cypress/support/e2e.js
js

import './commands';
require('@4tw/cypress-drag-drop');
require('cypress-file-upload');
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message && err.message.includes('Script error')) {
    return false;
  }
});
6. Crie os arquivos de feature, steps, POs e unit tests conforme exemplos acima
7. Execute os testes
bash

npx cypress open
# ou
npx cypress run

---

10. Boas Práticas e Observações
Sempre use emails e dados únicos para evitar conflitos com registros default do DemoQA.
Use .within() e seletores robustos para garantir o escopo correto em tabelas e listas.
Aguarde elementos visíveis e o DOM estabilizar antes de interagir.
Documente todos os métodos com XML doc e comentários detalhados.
Inclua unit tests para todos os métodos dos Page Objects.
Use comandos customizados para operações complexas (drag-and-drop, upload, etc).
Mantenha o handler de exceção para scripts externos.
Integre os testes ao CI/CD para garantir qualidade contínua.
Mantenha o projeto atualizado e documente no README as práticas e comandos customizados.
Exemplo de XML Documentation para um método
js

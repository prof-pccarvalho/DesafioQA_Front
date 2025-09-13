-----

# 📌📚 Documentação Completa do Projeto Cypress + Cucumber DemoQA

Este é um guia detalhado do projeto de automação E2E (End-to-End) para o site DemoQA. O projeto utiliza Cypress, Cucumber (Gherkin), e um conjunto de boas práticas, como o padrão Page Objects e a criação de comandos customizados, para garantir testes robustos, legíveis e de fácil manutenção.

-----

### **Sumário**

1.  [**Visão Geral do Projeto**](https://www.google.com/search?q=%231-vis%C3%A3o-geral-do-projeto)
2.  [**Estrutura de Pastas e Arquivos**](https://www.google.com/search?q=%232-estrutura-de-pastas-e-arquivos)
3.  [**Features Implementadas**](https://www.google.com/search?q=%233-features-implementadas)
4.  [**Page Objects (POs)**](https://www.google.com/search?q=%234-page-objects-pos)
5.  [**Step Definitions**](https://www.google.com/search?q=%235-step-definitions)
6.  [**Fixtures**](https://www.google.com/search?q=%236-fixtures)
7.  [**Support**](https://www.google.com/search?q=%237-support)
8.  [**Unit Tests**](https://www.google.com/search?q=%238-unit-tests)
9.  [**Passo a Passo para Criar o Projeto do Zero**](https://www.google.com/search?q=%239-passo-a-passo-para-criar-o-projeto-do-zero)
10. [**Boas Práticas e Observações**](https://www.google.com/search?q=%2310-boas-pr%C3%A1ticas-e-observa%C3%A7%C3%B5es)

-----

### **1. Visão Geral do Projeto**

O projeto automatiza cenários E2E do site **DemoQA** usando **Cypress 12.x**, **Cucumber** (Gherkin), e um conjunto de boas práticas, como o padrão Page Objects e a criação de comandos customizados, para garantir testes robustos, legíveis e de fácil manutenção. O principal objetivo é seguir padrões profissionais de documentação e cobertura de código para manter a qualidade e a escalabilidade dos testes.

-----

### **2. Estrutura de Pastas e Arquivos**

A estrutura do projeto foi organizada para facilitar a navegação e a manutenção, seguindo o padrão de projetos de automação Cypress com Cucumber:

```
cypress/
├── e2e/
│   ├── features/              # Arquivos .feature (cenários em Gherkin)
│   ├── pageObjects/           # Page Objects (classes para cada componente)
│   └── stepDefinitions/       # Step Definitions (implementação dos steps)
├── fixtures/                  # Dados de teste (JSON, arquivos de upload, etc.)
├── support/
│   ├── commands.js            # Comandos customizados do Cypress
│   └── e2e.js                 # Configurações globais e handlers
├── downloads/                 # Downloads gerados pelos testes
├── screenshots/               # Screenshots automáticos de falhas
├── videos/                    # Vídeos automáticos das execuções
└── cypress.config.js          # Configuração principal do Cypress
```

-----

### **3. Features Implementadas**

As seguintes funcionalidades do site DemoQA foram automatizadas:

  * **forms.feature:** Automação completa do formulário de registro, incluindo campos complexos (datepicker, selects customizados, upload de arquivos) e validação do modal de confirmação.
  * **progressBar.feature:** Automação de testes para iniciar, pausar e resetar a barra de progresso, validando o progresso em diferentes percentuais.
  * **sortable.feature:** Cenários de *drag-and-drop* para ordenar e desordenar listas, com validação da nova ordem dos elementos.
  * **browserWindows.feature:** Testes para abertura de novas janelas do navegador e validação do seu conteúdo.
  * **webTables.feature:** Automação de criação, edição e exclusão de registros na tabela, incluindo testes de criação e exclusão em massa e validação da presença ou ausência dos registros.

-----

### **4. Page Objects (POs)**

Todos os Page Objects (POs) seguem um padrão de design que inclui:

  * Documentação detalhada em **XML doc** em todas as classes e métodos.
  * Comentários claros para explicar cada passo relevante.
  * Unit tests dedicados para cada método do PO.

**Exemplo de método em um PO:**

```javascript
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
```

**POs existentes:**

  * `formsPage.js`
  * `progressBarPage.js`
  * `sortablePage.js`
  * `browserWindowsPage.js`
  * `webTablesPage.js`

-----

### **5. Step Definitions**

Cada arquivo de *feature* possui um arquivo de *step definitions* correspondente. Os passos genéricos (como navegação e cliques em menus) são centralizados em **`commonSteps.js`**, enquanto os passos específicos de cada funcionalidade são mantidos em seus respectivos arquivos.

**Exemplo de Step Definition:**

```javascript
When('cria um novo registro com os dados:', (dataTable) => {
  const user = dataTable.hashes()[0];
  webTablesPage.createRecord(user);
});
```

-----

### **6. Fixtures**

As `fixtures` são utilizadas para armazenar dados de teste estáticos, garantindo a separação entre os dados e a lógica dos testes.

  * `randomUser.json`: Dados dinâmicos para testes de cadastro.
  * `uploadFile.txt`: Arquivo de exemplo para testes de upload.
  * `users.json`: Lista de usuários para testes em massa.

-----

### **7. Support**

A pasta `support` contém arquivos essenciais para a configuração e extensibilidade do Cypress.

#### **`commands.js`**

Este arquivo armazena comandos customizados que podem ser reutilizados em todo o projeto.

**Exemplo de comando para Drag-and-Drop:**

```javascript
Cypress.Commands.add('robustDragAndDrop', (sourceSelector, targetSelector) => {
  cy.get(sourceSelector).scrollIntoView().should('be.visible').trigger('mousedown', { which: 1, force: true });
  cy.get(targetSelector).scrollIntoView().should('be.visible').trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
  cy.wait(800);
});
```

#### **`e2e.js`**

Este arquivo contém configurações globais, incluindo a importação de comandos customizados e um *handler* para ignorar erros de scripts de terceiros.

```javascript
import './commands';
require('@4tw/cypress-drag-drop');
require('cypress-file-upload');

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message && err.message.includes('Script error')) {
    return false;
  }
});
```

-----

### **8. Unit Tests**

Todos os métodos dos Page Objects possuem **unit tests** dedicados, localizados em arquivos `.spec.js` dentro da própria pasta `pageObjects`.

**Exemplo de unit test:**

```javascript
it('deve deletar um registro existente pelo email', () => {
  webTablesPage.deleteRecordByEmail('userdel@ex.com');
  webTablesPage.shouldNotExist('userdel@ex.com');
});
```

-----

### **9. Passo a Passo para Criar o Projeto do Zero**

Siga este guia para replicar o projeto em seu ambiente local.

#### **Pré-requisitos**

  * Node.js \>= 14.x
  * npm \>= 6.x

#### **1. Inicialize o projeto**

```bash
npm init -y
```

#### **2. Instale as dependências**

```bash
npm install cypress@12.17.4 @badeball/cypress-cucumber-preprocessor@15.1.5 @bahmutov/cypress-esbuild-preprocessor@2.2.5 @4tw/cypress-drag-drop@2.3.0 cypress-file-upload@5.0.8 esbuild@0.17.19 --save-dev
```

#### **3. Estruture as pastas**

```bash
mkdir -p cypress/e2e/features cypress/e2e/pageObjects cypress/e2e/stepDefinitions cypress/fixtures cypress/support
```

#### **4. Configure o Cypress + Cucumber**

Crie ou ajuste o arquivo `cypress.config.js` com o seguinte conteúdo:

```javascript
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
```

#### **5. Importe plugins e comandos em `cypress/support/e2e.js`**

```javascript
import './commands';
require('@4tw/cypress-drag-drop');
require('cypress-file-upload');

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message && err.message.includes('Script error')) {
    return false;
  }
});
```

#### **6. Crie os arquivos de feature, steps, POs e unit tests conforme exemplos acima.**

#### **7. Execute os testes**

```bash
npx cypress open
# ou
npx cypress run
```

-----

### **10. Boas Práticas e Observações**

  * Sempre use emails e dados **únicos** para evitar conflitos com registros default do DemoQA.
  * Utilize o comando `.within()` e seletores robustos para garantir o escopo correto em tabelas e listas.
  * Aguarde os elementos estarem **visíveis** e o DOM estabilizado antes de interagir.
  * Documente todos os métodos com XML doc e **comentários detalhados**.
  * Inclua **unit tests** para todos os métodos dos Page Objects.
  * Crie **comandos customizados** para operações complexas, como `drag-and-drop` e `upload`.
  * Mantenha o *handler* de exceção para scripts externos.
  * Planeje a integração dos testes a um pipeline de **CI/CD** para garantir a qualidade contínua do software.
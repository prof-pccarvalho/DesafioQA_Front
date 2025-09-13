/**
 * <summary>
 * Page Object para interações com o formulário de prática do DemoQA.
 * Fornece métodos para preencher, submeter e validar o formulário, incluindo upload de arquivos.
 * </summary>
 */
class FormsPage {
  /**
   * <summary>
   * Navega diretamente até a página do formulário DemoQA.
   * </summary>
   * <returns>void</returns>
   */
  visit() {
    cy.visit('/automation-practice-form');
  }

  /**
   * <summary>
   * Preenche o formulário com os dados fornecidos.
   * </summary>
   * @param {Object} user - Objeto com os dados do usuário.
   * @param {string} user.firstName - Primeiro nome.
   * @param {string} user.lastName - Sobrenome.
   * @param {string} user.email - Email.
   * @param {string} user.gender - Gênero (Male, Female, Other).
   * @param {string} user.phone - Telefone.
   * @param {string} user.birthDate - Data de nascimento no formato 'DD MMMM YYYY' (ex: '10 May 1990').
   * @param {string} user.subjects - Matéria.
   * @param {string} user.hobby - Código do hobby (1, 2, 3).
   * @param {string} user.address - Endereço.
   * @param {string} user.state - Estado.
   * @param {string} user.city - Cidade.
   * @returns>void</returns>
   */
  fillForm(user) {
    // Preenche campos básicos de texto
    cy.get('#firstName').clear().type(user.firstName);
    cy.get('#lastName').clear().type(user.lastName);
    cy.get('#userEmail').clear().type(user.email);

    // Seleciona o gênero (Male, Female, Other)
    cy.get(`[name="gender"][value="${user.gender}"]`).check({ force: true });

    // Preenche o telefone
    this.fillPhone(user.phone);


    // Preenche a data de nascimento usando interação real com o datepicker
    this.fillBirthDate(user.birthDate);

    // Preenche a matéria
    cy.get('#subjectsInput').type(user.subjects).type('{enter}');

    // Seleciona o hobby
    cy.get(`#hobbies-checkbox-${user.hobby}`).check({ force: true });

    // Preenche o endereço
    cy.get('#currentAddress').clear().type(user.address);

    // Seleciona estado e cidade usando os campos do react-select customizado
    this.selectReactSelect('react-select-3-input', user.state);
    this.selectReactSelect('react-select-4-input', user.city);
  }

  /**
 * <summary>
 * Preenche o campo de telefone, garantindo que apenas os 10 primeiros dígitos sejam usados.
 * </summary>
 * @param {string} phone - Número de telefone (serão usados apenas os 10 primeiros dígitos).
 * @returns {void}
 */
  fillPhone(phone) {
    // Garante que só os 10 primeiros dígitos serão usados
    const phone10 = phone.replace(/\D/g, '').slice(0, 10);
    cy.get('#userNumber').clear().type(phone10);
  }

  /**
   * <summary>
   * Seleciona um valor em um campo react-select customizado (como Estado ou Cidade no DemoQA).
   * </summary>
   * @param {string} selectId - O id do input (ex: 'react-select-3-input' para Estado).
   * @param {string} value - O valor a ser selecionado.
   * @returns {void}
   */
  selectReactSelect(selectId, value) {
    // Encontra o container visual do select (pode ser .css-1wa3eu0-placeholder ou .css-1hwfws3)
    // O seletor abaixo cobre a maioria dos casos do DemoQA:
    cy.get(`#${selectId}`)
      .parents('.css-2b097c-container') // container principal do react-select
      .find('.css-1hwfws3') // área clicável (ajuste conforme necessário)
      .click();

    // Digita o valor e pressiona Enter para selecionar
    cy.get(`#${selectId}`).type(value + '{enter}');
  }

  /**
   * <summary>
   * Preenche o campo de data de nascimento do formulário DemoQA usando interação real com o datepicker.
   * </summary>
   * @param {string} date - Data no formato 'DD MMMM YYYY', ex: '10 May 1990'.
   * @returns>void</returns>
   */
  fillBirthDate(date) {
    // Divide a data em partes
    const [day, monthInput, year] = date.split(' ');

    // Mapeia abreviações ou meses em português para o nome completo em inglês
    const monthMap = {
      'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
      'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
      'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December',
      'Janeiro': 'January', 'Fevereiro': 'February', 'Março': 'March', 'Abril': 'April',
      'Maio': 'May', 'Junho': 'June', 'Julho': 'July', 'Agosto': 'August',
      'Setembro': 'September', 'Outubro': 'October', 'Novembro': 'November', 'Dezembro': 'December'
    };

    // Usa o nome do mês completo em inglês
    const month = monthMap[monthInput] || monthInput;

    // Abre o datepicker
    cy.get('#dateOfBirthInput').click();

    // Seleciona o ano
    cy.get('.react-datepicker__year-select').select(year);

    // Seleciona o mês
    cy.get('.react-datepicker__month-select').select(month);

    // Seleciona o dia (removendo zeros à esquerda)
    cy.get(`.react-datepicker__day--0${parseInt(day, 10)}`)
      .not('.react-datepicker__day--outside-month')
      .click();
  }

  /**
   * <summary>
   * Realiza o upload de um arquivo no campo de upload.
   * </summary>
   * @param {string} fileName - Nome do arquivo presente em cypress/fixtures.
   * @returns>void</returns>
   */
  uploadFile(fileName) {
    cy.get('#uploadPicture').attachFile(fileName);
  }

  /**
   * <summary>
   * Submete o formulário.
   * </summary>
   * @returns>void</returns>
   */
  submit() {
    cy.get('#submit').click({ force: true });
  }

  /**
   * <summary>
   * Verifica se o modal de confirmação está visível.
   * </summary>
   * @returns>void</returns>
   */
  verifyPopup() {
    cy.get('.modal-content').should('be.visible');
  }

  /**
   * <summary>
   * Fecha o modal de confirmação do formulário DemoQA.
   * Garante que o botão está visível e, se necessário, força o clique.
   * </summary>
   * @returns {void}
   */
  closePopup() {
    // Aguarda o modal estar visível
    cy.get('.modal-content').should('be.visible');
    // Rola o botão para a viewport e força o clique para garantir o fechamento
    cy.get('#closeLargeModal').scrollIntoView().click({ force: true });
  }

}
module.exports = new FormsPage();

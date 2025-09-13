/**
 * <summary>
 * Step Definitions para o cenário de ordenação do DemoQA Sortable.
 * Utiliza o Page Object SortablePage.
 * </summary>
 */

const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const sortablePage = require('../pageObjects/sortablePage');

// Ordem padrão do DemoQA (ajuste se necessário)
const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

/**
 * <summary>
 * Step para embaralhar a lista.
 * </summary>
 */
When('desordena os elementos da lista', () => {
  sortablePage.shuffleList();
});

/**
 * <summary>
 * Step para validar que a lista não está em ordem crescente.
 * </summary>
 */
Then('a lista não deve estar em ordem crescente', () => {
  sortablePage.shouldNotBeSorted(expectedOrder);
});

/**
 * <summary>
 * Step para ordenar a lista em ordem crescente.
 * </summary>
 */
When('ordena os elementos da lista em ordem crescente', () => {
  sortablePage.sortListToOrder(expectedOrder);
});

/**
 * <summary>
 * Step para validar que a lista está em ordem crescente.
 * </summary>
 */
Then('a lista deve estar em ordem crescente', () => {
  sortablePage.shouldBeSorted(expectedOrder);
});

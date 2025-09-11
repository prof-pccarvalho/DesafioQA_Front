const sortablePage = require('./sortablePage');

describe('SortablePage', () => {
  beforeEach(() => {
    cy.visit('/sortable');
  });

  it('deve ordenar os elementos da lista em ordem crescente', () => {
    sortablePage.sortListAscending();
    sortablePage.shouldBeSortedAscending();
  });

  it('deve retornar os textos dos itens da lista', () => {
    sortablePage.getListItems().then(items => {
      expect(items).to.be.an('array').and.not.empty;
    });
  });
});

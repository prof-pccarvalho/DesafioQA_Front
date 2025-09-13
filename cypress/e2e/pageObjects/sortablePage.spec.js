/**
 * <summary>
 * Unit tests para métodos do Page Object SortablePage.
 * </summary>
 */

const sortablePage = require('./sortablePage');

describe('SortablePage', () => {
  beforeEach(() => {
    sortablePage.visit();
  });

  it('deve retornar todos os itens visíveis da lista', () => {
    sortablePage.getListItems().then(items => {
      expect(items.length).to.be.at.least(6);
      items.forEach(item => expect(item).to.be.a('string').and.not.to.be.empty);
    });
  });

  it('deve embaralhar a lista e garantir que a ordem mudou', () => {
    sortablePage.getListItems().then(originalOrder => {
      sortablePage.shuffleList();
      sortablePage.getListItems().then(shuffledOrder => {
        expect(shuffledOrder).to.not.deep.equal(originalOrder);
      });
    });
  });

  it('deve ordenar a lista em ordem crescente', () => {
    const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    sortablePage.sortListToOrder(expectedOrder);
    sortablePage.getListItems().then(items => {
      expect(items).to.deep.equal(expectedOrder);
    });
  });

  it('deve validar se a lista está em ordem crescente', () => {
    const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    sortablePage.shouldBeSorted(expectedOrder);
  });

  it('deve validar se a lista não está em ordem crescente após embaralhar', () => {
    const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    sortablePage.shuffleList();
    sortablePage.shouldNotBeSorted(expectedOrder);
  });
});

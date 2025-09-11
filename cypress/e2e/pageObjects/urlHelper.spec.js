const { menuToSlug } = require('./urlHelper');

describe('menuToSlug', () => {
  it('deve converter menu para slug', () => {
    expect(menuToSlug('Alerts, Frame & Windows')).to.equal('alerts,frame&windows');
    expect(menuToSlug('Elements')).to.equal('elements');
    expect(menuToSlug('Practice Form')).to.equal('practiceform');
  });
});

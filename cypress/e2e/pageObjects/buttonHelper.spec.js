const { getButtonSelector } = require('./buttonHelper');

describe('getButtonSelector', () => {
  it('retorna o seletor correto para botões conhecidos', () => {
    expect(getButtonSelector('New Window')).to.equal('#windowButton');
    expect(getButtonSelector('Start')).to.equal('#startStopButton');
    expect(getButtonSelector('Start novamente')).to.equal('#startStopButton');
    expect(getButtonSelector('Reset')).to.equal('#resetButton');
  });

  it('retorna undefined para botões desconhecidos', () => {
    expect(getButtonSelector('Botão Inexistente')).to.be.undefined;
  });
});

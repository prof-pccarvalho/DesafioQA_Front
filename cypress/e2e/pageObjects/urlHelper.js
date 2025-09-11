/**
 * Helper para gerar um slug de menu.
 * @param {string} menu - Nome do menu.
 * @returns {string} Slug para URL.
 */
function menuToSlug(menu) {
    // Remove espaços e converte para minúsculas
    return menu.toLowerCase().replace(/\s/g, '');
  }
  module.exports = { menuToSlug };
  
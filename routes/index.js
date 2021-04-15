const Pet = require('../models/pet');

module.exports = (app) => {

  /* GET home page. */
  app.get('/', (req, res) => {
    let page = req.query.page || 1;

    Pet.paginate().then((pets) => {
      if (page < 1) {
        page = 1
      } else if (page > pets.pages) {
        page = pets.pages
      }
      res.render('pets-index', { pets: pets.docs, pageCount: pets.pages, thisPage: page });
    });
  });
}

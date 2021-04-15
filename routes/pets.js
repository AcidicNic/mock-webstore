// MODELS
const Pet = require('../models/pet');

// PET ROUTES
module.exports = (app) => {

  // INDEX PET => index.js

  // NEW PET
  app.get('/pets/new', (req, res) => {
    res.render('pets-new');
  });

  // CREATE PET
  app.post('/pets', (req, res) => {
    var pet = new Pet(req.body);

    pet.save()
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`);
      })
      .catch((err) => {
        // Handle Errors
      }) ;
  });

  // SHOW PET
  app.get('/pets/:id', (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render('pets-show', { pet: pet });
    });
  });

  // EDIT PET
  app.get('/pets/:id/edit', (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render('pets-edit', { pet: pet });
    });
  });

  // UPDATE PET
  app.put('/pets/:id', (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body)
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`)
      })
      .catch((err) => {
        // Handle Errors
      });
  });

  // DELETE PET
  app.delete('/pets/:id', (req, res) => {
    Pet.findByIdAndRemove(req.params.id).exec((err, pet) => {
      return res.redirect('/')
    });
  });

  // SEARCH PETS
  app.get('/search', (req, res) => {
    let page = req.query.page || 1;
    const query = new RegExp(req.query.q, 'i');

    Pet.paginate({$or:[
      {'name': query}, {'species': query}
    ]}).then((pets) => {
      if (page < 1) {
        page = 1
      } else if (page > pets.pages) {
        page = pets.pages
      }
      res.render('pets-index', { pets: pets.docs, pageCount: pets.pages, thisPage: page });
    });
  });

}

"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate');
mongoosePaginate.paginate.options = {
  limit: 3
}

const PetSchema = new Schema({
  name            : { type: String, required: true },
  species         : { type: String, required: true },
  birthday        : { type: String, required: true },
  picUrl          : { type: String },
  picUrlSq        : { type: String },
  avatarUrl       : { type: String, required: true },
  favoriteFood    : { type: String, required: true },
  description     : { type: String, required: true, minlength: 140 },
  price           : { type: Number, required: true }
},
{
  timestamps: true
});

PetSchema.index(
  {
  name: 'text', species: 'text', favoriteFood: 'text', description: 'text'
  },
  {
    name: 'My text index', weights: {
      name: 10, species: 4, favoriteFood: 2, description: 1
    }
  }
);


PetSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Pet', PetSchema);

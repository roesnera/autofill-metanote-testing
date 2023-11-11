const mongoose = require('mongoose');
const { extendSchema } = require('../../helpers/extendSchema');
const noteBaseSchema = require('./noteBase');
const { Schema } = mongoose;
const { setDefault, stringDefault } = require('../helpers');

let otvSchema = extendSchema(noteBaseSchema, {
    ariaSources: {
      type: String,
      default: '1'
    },
    ariaId: {
        type: String,
        default: '1'
    },
    diseaseSite: {
      type: String,
      default: 'prostate',
      immutable: true
    },

    noteName: {
      type: String,
      default: 'otv',
      immutable: true
    },
    adt: { type: String },
    gleasonScore: {type: Number },
    painManagementDescription:{type: String},
    painScore:{type: Number}
});

module.exports = otvSchema;
const mongoose = require('mongoose');
const { extendSchema } = require('../../helpers/extendSchema');
const noteBaseSchema = require('./noteBase');
const { Schema } = mongoose;
const { setDefault, stringDefault } = require('../helpers');

let eotSchema = extendSchema(noteBaseSchema, {
    diseaseSite: {
      type: String,
      default: 'prostate',
      immutable: true
    },

    noteName: {
      type: String,
      default: 'eot',
      immutable: true
    },
    diagnosis: { type: String },
    stage: { type: String },
    TNMStaging: {
        TNM: stringDefault,
        staging: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
            set: setDefault('')
        },
        nccnRiskGroup: stringDefault,
        groupStage: stringDefault
    }
});

module.exports = eotSchema;
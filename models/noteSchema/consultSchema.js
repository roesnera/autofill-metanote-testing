const mongoose = require('mongoose');
const { extendSchema } = require('../../helpers/extendSchema');
const noteBaseSchema = require('./noteBase');
const { Schema } = mongoose;
const { setDefault, stringDefault } = require('../helpers');

let consultSchema = extendSchema(noteBaseSchema, {
    diseaseSite: {
      type: String,
      default: 'prostate',
      immutable: true
    },
  
    hasBeenLoaded : {
      type: Boolean,
      default: false
    },
  
    noteName: {
      type: String,
      default: 'consult',
      immutable: true
    },
  
    chiefComplaint: {
      type: String,
      default: 'Prostate Cancer'
    },
  socialHistory: {
    include: {
      type: Boolean,
      default: false
    },
    smoking: {
      status: {
        type: String,
        enum: ['', 'never', 'former', 'current'],
        default: '',
        set: setDefault('')
      },
      years: {
        type: Number,
        min: 0,
        set: v => Math.round(v)
      },
      packRate: Number,
      unit: stringDefault,
      description: stringDefault,
    },
    alcohol: {
      status: {
        type: String,
        enum: ['', 'yes', 'no', 'former'],
        default: '',
        set: setDefault('')
      },
      drinksPerWeek: {
        type: Number,
        min: 0,
        set: v => Math.round(v)
      }
    },
    recreationalDrugs: {
      used: Boolean,
      history: stringDefault
    },
    freeText: stringDefault,
    hazardousMaterialExposure: stringDefault,
    family: {
      include: {
        type: Boolean,
        default: false
      },
      maritalStatus: {
        type: String,
        enum: ['', 'single', 'married', 'divorced', 'widowed'],
        default: '',
        set: setDefault('')
      },
      cancerCaseDescription: stringDefault
    }
  }
});

module.exports = consultSchema;
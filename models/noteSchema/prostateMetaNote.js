const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultSchema = require('./consultSchema');
const eotSchema = require('./eotSchema');
const otvSchema = require('./otvSchema');

const schemaToJson = require('../../helpers/schema-to-json');
const mergeSchema = require('../../helpers/append-nested-json');
const createSchema = require('../../helpers/create-mongoose-schema-from-object');

const consultJson = schemaToJson(consultSchema);
const eotJson = schemaToJson(eotSchema);
const otvJson = schemaToJson(otvSchema);

const metaNoteJson = mergeSchema([consultJson, eotJson, otvJson]);

const prostateMetaNoteSchema = createSchema(metaNoteJson);

module.exports = prostateMetaNoteSchema;

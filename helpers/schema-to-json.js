const { Schema } = require('mongoose');
const _ = require('lodash');


/**
 * Converts a Mongoose schema to a JSON object describing its fields and types.
 * @param {Schema} schema - The Mongoose schema to describe.
 * @param {boolean} [stripId=false] - Whether to exclude the _id field from the description.
 * @returns {Object} - A JSON object describing the schema's fields and types.
 * @throws {Error} - If the parameter is not a Mongoose schema.
 */
function describeSchema(schema, stripId = false) {
    if(schema.schema){
      ({schema} = schema);
    }
  
    if(!(schema instanceof Schema)){
      throw new Error('Argument Error: parameter must be a Mongoose Schema');
    }
  
    const description = {}
  
    for(let path in schema.paths){
      let field = schema.paths[path];
      let type;
      try {
        type = field.__proto__.constructor.schemaName;
      }
      catch(error) {
        type = 'Unknown';
      }
  
      switch(type) {
        case 'DocumentArray':
          type = [describeSchema(field, true)];
          break;
        case 'Array':
          let elementType;
          try {
            elementType = field.caster.instance || 'Unknown';
          } catch (error) {
            elementType = 'Unknown';
          }
          type = [elementType];
          break;
      }
  
      _.set(description, path, type);
    }
  
    if(stripId && description._id){
      delete description._id;
    }
  
    return description;
  
  }


module.exports = describeSchema;
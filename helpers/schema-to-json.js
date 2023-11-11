const { Schema } = require('mongoose');
const _ = require('lodash');


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
      }
  
      _.set(description, path, type);
    }
  
    if(stripId && description._id){
      delete description._id;
    }
  
    return description;
  
  }


module.exports = describeSchema;
exports.extendSchema = function extendSchema(schema, additions) {
    schema = schema.clone();
  
    schema.add(additions);
  
    return schema;
};
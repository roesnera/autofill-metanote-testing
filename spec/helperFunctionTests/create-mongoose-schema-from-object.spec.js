const createMongooseSchemaFromObject = require('../../helpers/create-mongoose-schema-from-object');
const describeSchema = require('../../helpers/schema-to-json');

describe('createMongooseSchemaFromObject', () => {
  it('should create a Mongoose schema from a simple object', () => {
    const obj = { name: 'String', age: "Number" };
    const schema = createMongooseSchemaFromObject(obj);
    expect(describeSchema(schema, true)).toEqual({ name: "String", age: "Number" });
  });

  it('should create a Mongoose schema from an object with nested objects', () => {
    const obj = { name: 'String', address: { city: 'String', state: 'String' } };
    const schema = createMongooseSchemaFromObject(obj);
    objFromSchema = describeSchema(schema, true);
    expect(objFromSchema).toEqual({
      name: "String",
      address: { city: "String", state: "String" },
    });
  });

  it('should create a Mongoose schema from an object with arrays', () => {
    const obj = { name: 'String', hobbies: ['String', 'String'] };
    const schema = createMongooseSchemaFromObject(obj);
    const objFromSchema = describeSchema(schema, true);
    // console.log(objFromSchema.hobbies);
    expect(objFromSchema).toEqual({ name: "String", hobbies: ["String"] });
  });

  it('should create a Mongoose schema from an object with mixed types', () => {
    const obj = { name: 'String', age: "Number", isMarried: "Boolean", address: { city: 'String', state: 'String' }, hobbies: ['String', 'String'] };
    const schema = createMongooseSchemaFromObject(obj);
    const objFromSchema = describeSchema(schema, true);
    expect(objFromSchema).toEqual({
      name: "String",
      age: "Number",
      isMarried: "Boolean",
      address: { city: "String", state: "String" },
      hobbies: ["String"],
    });
  });
});
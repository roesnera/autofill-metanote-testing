const createMongooseSchemaFromObject = require('../../helpers/create-mongoose-schema-from-object');
const describeSchema = require('../../helpers/schema-to-json');
const consultNoteOutline = require('./consultNoteOutline.json');
const partialConsultNote = require('./consultNotePartial.json');

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

  it('should create a Mongoose schema from an object with multiply nested objects', () => {
    const obj = {
      name: 'String',
      priorMedicalHistory: {
        conditions: ['String', 'String'],
        medications: ['String', 'String'],
        previousDiagnosis: [{
          date: 'Date',
          details: 'String',
          diagnosis: {
            description: 'String',
            diagnosisCode: 'String',
            date: 'Date',
          }
        }]
      }
    };
    const schema = createMongooseSchemaFromObject(obj);
    objFromSchema = describeSchema(schema, true);

    const expected = {
      name: 'String',
      priorMedicalHistory: {
        conditions: ['String'],
        medications: ['String'],
        previousDiagnosis: [{
          date: 'Date',
          details: 'String',
          diagnosis: {
            description: 'String',
            diagnosisCode: 'String',
            date: 'Date',
          }
        }]
      }
    };

    expect(objFromSchema).toEqual(expected);
  });

  it('should handle moderately complex nested object structure and preserve all base types', () => {
    const schema = createMongooseSchemaFromObject(consultNoteOutline);
    const objFromSchema = describeSchema(schema, true);
    delete consultNoteOutline._id;
    expect(objFromSchema).toEqual(consultNoteOutline);
  })  

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
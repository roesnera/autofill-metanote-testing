const describeSchema = require("../../helpers/schema-to-json");
const mongoose = require("mongoose");

describe("describeSchema", () => {
  let schema;

  beforeAll(() => {
    schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: false,
      },
      somethingNested: {
        nested1: {
          type: String,
          required: true,
        },
        nested2: {
          type: String,
          required: false,
        },
      },
    });
  });

  it("should return an object with the same paths as the mongoose schema", () => {
    const expected = {
      name: "String",
      age: "Number",
      email: "String",
      somethingNested: {
        nested1: "String",
        nested2: "String",
      },
    };
    const result = describeSchema(schema);
    delete result._id;
    expect(result).toEqual(expected);
  });

  it("should not include paths that are not defined in the mongoose schema", () => {
    const expected = {
      name: "String",
      age: "Number",
      email: "String",
      somethingNested: {
        nested1: "String",
        nested2: "String",
      },
      somethingMissing: "I do not exist on the original schema"
    };
    const result = describeSchema(schema);
    delete result._id;
    expect(result).not.toEqual(expected);
    delete expected.somethingMissing;
    expect(result).toEqual(expected);
  });
});

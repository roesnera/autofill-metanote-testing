const mongoose = require('mongoose');

/**
 * Creates a Mongoose schema from a JavaScript object. Made to accept objects in the format produced by describeSchema()
 * @param {Object} obj - The JavaScript object to create the schema from. Can be nested, but values should be string representation of datatypes.
 * @param {boolean} [topLevel=true] - Whether or not this is the top level object.
 * @returns {mongoose.Schema|Object} - The Mongoose schema or schema definition.
 */
function createMongooseSchemaFromObject(obj, topLevel = true) {
    // console.log(obj);
    const schemaDefinition = {};

    for (const [key, value] of Object.entries(obj)) {
        if(Array.isArray(value)) {
            if(typeof value[0] === "object" && typeof value[0] !== "string") {
                // If the value is an array, create a schema for the array elements
                schemaDefinition[key] = [createMongooseSchemaFromObject(value[0], false)];
            } else {
                // If the value is an array of primitive types, convert the datatype to the corresponding Mongoose type
                schemaDefinition[key] = [convertToMongooseType(value[0])];
            }
        } else if (typeof value === 'object' && value !== null && typeof value !== "string") {
            // Recursively process nested objects
            schemaDefinition[key] = createMongooseSchemaFromObject(value, false);
        } else {
            // Convert the datatype to the corresponding Mongoose type

            // If the key is "type", wrap the value in an object with a "type" property, 
            // otherwise mongoose will interpret it as the type for whetever object the key is embedded in
            if(key==="type"){
                schemaDefinition[key] = {type: convertToMongooseType(value)};
            } else {
                schemaDefinition[key] = convertToMongooseType(value);
            }
        }
    }

    if (topLevel) {
        // If this is the top level object, wrap it in a schema
        return new mongoose.Schema(schemaDefinition);
    } else {
        // Otherwise, just return the schema definition
        return schemaDefinition;
    }
}

function convertToMongooseType(type) {
    const typeMapping = {
        'String': mongoose.Schema.Types.String,
        'Number': mongoose.Schema.Types.Number,
        'Date': mongoose.Schema.Types.Date,
        'Buffer': mongoose.Schema.Types.Buffer,
        'Boolean': mongoose.Schema.Types.Boolean,
        'Mixed': mongoose.Schema.Types.Mixed,
        'ObjectId': mongoose.Schema.Types.ObjectId,
        'Array': mongoose.Schema.Types.Array,
        'Decimal128': mongoose.Schema.Types.Decimal128,
        'Map': mongoose.Schema.Types.Map
    };

    return typeMapping[type] || mongoose.Schema.Types.Mixed; // Fallback to Mixed if type is unknown
}


module.exports = createMongooseSchemaFromObject;
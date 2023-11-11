const mongoose = require('mongoose');

function createMongooseSchemaFromObject(obj) {
    const schemaDefinition = {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
            // Recursively process nested objects
            schemaDefinition[key] = createMongooseSchemaFromObject(value);
        } else {
            // Convert the datatype to the corresponding Mongoose type
            schemaDefinition[key] = convertToMongooseType(value);
        }
    }

    return new mongoose.Schema(schemaDefinition);
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
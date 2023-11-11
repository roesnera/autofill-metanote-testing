const mongoose = require('mongoose');
const { Schema } = mongoose;

let noteBaseSchema = new Schema({
    caseId: {
        type: String,
        required: true
    }
});

module.exports = noteBaseSchema;
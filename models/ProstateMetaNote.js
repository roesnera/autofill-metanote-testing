const mongoose = require('mongoose');

const prostateMetaNoteSchema = require('./noteSchema/prostateMetaNote');

const ProstateMetaNote = mongoose.model('ProstateMetaNote', prostateMetaNoteSchema);

module.exports = ProstateMetaNote;

const mongoose = require('mongoose');

const consultSchema = require('./noteSchema/consultSchema');
const otvSchema = require('./noteSchema/otvSchema');
const eotSchema = require('./noteSchema/eotSchema');

const { mergeNestedObjects } = require('../helpers/append-nested-json');
const { describeSchema } = require('../helpers/schema-to-json');

const ProstateMetaNote = require('./ProstateMetaNote');

const prostateNoteSchema = mongoose.Schema({
  patientName: {
    type: String
  }
});

prostateNoteSchema.post('save', function(doc) {
  updateMetaNote(doc).catch(err => console.log(err));
})

const ProstateNote = mongoose.model('ProstateNote', prostateNoteSchema);

const prostateConsultNote = ProstateNote.discriminator('consult', consultSchema);
const prostateOtvNote = ProstateNote.discriminator('otv', otvSchema);
const prostateEotNote = ProstateNote.discriminator('eot', eotSchema);

const modelMap = {
  consult: prostateConsultNote,
  otv: prostateOtvNote,
  eot: prostateEotNote
}

// document default values blindspot here and in readme!
async function updateMetaNote(doc) {
  console.log("Updating meta note function called");
  const noteData = doc.toObject();

  // Remove the version key and any other fields that should not be updated
  delete noteData.__v;
  delete noteData.__t;
  delete noteData._id;
  delete noteData.noteName;

  console.log(noteData);

  // Assuming noteData has an identifier like caseId that links it to the ProstateMetaNote
  const { caseId, ...updateFields } = noteData;
  
  // Update the ProstateMetaNote document
  await ProstateMetaNote.findOneAndUpdate(
    { caseId }, // Query to find the matching document
    { $set: updateFields }, // Update operation to update fields with noteData
    { upsert: true, new: true } // Options to create a new doc if none exist, and return the new doc
  );
}

exports.saveNote = async function(noteName, data) {
  const noteTypeSchema = modelMap[noteName];

  const createdNote = await noteTypeSchema.create(data);
  delete createdNote.__t;
  delete createdNote.__v;
  return createdNote;
}

exports.ProstateNote = ProstateNote;
exports.modelMap = modelMap;
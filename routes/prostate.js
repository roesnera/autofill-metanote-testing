const express = require('express');
const router = express.Router();
const { saveNote, ProstateNote, modelMap } = require('../models/ProstateNote');
const ProstateMetaNote = require('../models/ProstateMetaNote');
const schemaToJson = require('../helpers/schema-to-json');
const { extractDataByShape } = require('../helpers/extract-data-by-shape');
const { fillWithEmptyStrings } = require('../helpers/extract-data-by-shape');

/**
 * GET route to retrieve all ProstateNotes
 * @route GET /
 * @returns {Array<object>} The retrieved ProstateNotes array
 * @throws {object} 500 - Error retrieving the ProstateNotes array
 */
router.get('/', async (req, res) => {
  try {
    const prostateNotes = await ProstateNote.find();
    res.json(prostateNotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET route to retrieve a single prostateNote of route-specified type with most recent data from meta note
 * @route GET /:caseId/:note/autofill
 * @param {string} caseId - The ID of the case to retrieve the note for
 * @param {string} note - The name of the note to retrieve
 * @returns {object} The retrieved prostateNote object
 * @throws {object} 500 - Error retrieving the prostateNote object
 */
router.get('/:caseId/:note/autofill', async (req, res) => {
  const { note: noteName, caseId } = req.params;

    try {
        // get prostateNote object that is prefilled with relevant data from most recent notedata
        const prostateMetaNote = await ProstateMetaNote.findOne({ caseId });
        if(!prostateMetaNote) throw new Error('No meta note found for caseId: ' + caseId);
        let noteShape = schemaToJson(modelMap[noteName]);
        delete noteShape.noteName;
        let prostateNote = extractDataByShape(prostateMetaNote, noteShape);

        delete prostateNote._id;
        delete prostateNote.__v;
        delete prostateNote.__t;

        res.status(200).json(prostateNote);
      } catch (err) {
        // do not expose error message to user
        // use internal server error message instead
        // send something user friendly to client
        // possibly empty default object
        console.error(err);
        res.status(204).json({});
    }
});

/**
 * POST route to create a new ProstateNote
 * @route POST /:note/
 * @param {string} noteName - The name of the note to create
 * @param {object} data - The data to save for the new note
 * @returns {object} The created ProstateNote object
 * @throws {object} 500 - Error creating the ProstateNote object
 */
router.post('/:note/', async (req, res) => {
  const { note: noteName } = req.params;
  const data = req.body;
  const prostateNote = await saveNote(noteName, data);
  res.status(201).json(prostateNote);
});

router.delete('/:caseId', async (req, res) => {
  const { caseId } = req.params;
  try {
    await ProstateNote.deleteMany({ caseId });
    await ProstateMetaNote.deleteOne({ caseId });
    res.status(200).json({ message: 'Deleted all notes for caseId: ' + caseId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

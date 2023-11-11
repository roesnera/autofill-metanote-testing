const axios = require('axios');
const testObjects = require('./testObjects');

function postNoteToEndpoint(noteType, caseId) {
  const endpoint = `http://localhost:3000/api/prostate/${noteType}`;
  const note = {
    ...testObjects[`${noteType}Mock`],
    caseId
  }
  
  axios.post(endpoint, note)
    .then(response => {
      console.log(`Successfully posted note of type ${noteType} for case ${caseId}.`);
    })
    .catch(error => {
      console.error(`Error posting note of type ${noteType} for case ${caseId}: ${error}`);
    });
}

exports.postNoteToEndpoint = postNoteToEndpoint;
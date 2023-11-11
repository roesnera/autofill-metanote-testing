
// Import the required libraries
const { v4: uuidv4 } = require('uuid');

const caseId = '5f7b1b9b1b4a9c0e0c7e5d1f';

// Define the mock objects
const consultMock = {
    caseId,
    diseaseSite: 'prostate',
    noteName: 'consult',
    chiefComplaint: 'Prostate Cancer',
    socialHistory: {
        include: true,
        smoking: {
        status: 'never',
        years: 0,
        packRate: 0,
        unit: '',
        description: '',
        },
        alcohol: {
        status: 'yes',
        drinksPerWeek: 0,
        },
        recreationalDrugs: {
        used: false,
        },
    },
};

const eotMock = {
    caseId,
    diseaseSite: 'prostate',
    noteName: 'eot',
    diagnosis: 'Prostate Cancer',
    stage: 'IVa',
};

const otvMock = {
    caseId,
    ariaSources: '1',
    ariaId: '1',
    diseaseSite: 'prostate',
    noteName: 'otv',
    gleasonScore: 7,
};

// Export the mock objects
module.exports = {
  consultMock,
  eotMock,
  otvMock,
};

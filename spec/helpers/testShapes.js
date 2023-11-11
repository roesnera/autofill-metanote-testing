const describeSchema = require('../../helpers/schema-to-json');
const modelMap = require('../../models/ProstateNote').modelMap;

exports.consultShape = describeSchema(modelMap.consult);
exports.otvShape = describeSchema(modelMap.otv);
exports.eotShape = describeSchema(modelMap.eot);

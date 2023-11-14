/**
 * Extracts data from a source object that conforms to the shape of the shape object.
 * @param {Object} source - The source object to extract data from.
 * @param {Object} shape - The object that provides the shape to conform to.
 * @returns {Object} - The new object with data extracted from the source object.
 */
exports.extractDataByShape = function extractDataByShape(source, shape) {
    const extract = (source, shape) => {
      // Create an empty object to store the extracted data
      const extracted = {};
  
      // Iterate over the shape object's fields
      for (const key in shape) {
        if (shape.hasOwnProperty(key)) {
          // Check if the current field is an object and not an array or null
          if (shape[key] && typeof shape[key] === 'object' && !Array.isArray(shape[key])) {
            // Recursively extract data for nested objects

            // If source is null, shape should be filled with empty strings
            if(!source) {
              extracted[key] = fillWithEmptyStrings(shape[key]);
            }
            else {
              extracted[key] = extract(source[key], shape[key]);
            }
          } else {
            // Directly assign the value from the source object
            if(!!source){
              extracted[key] = source[key];
            } else {
              extracted[key] = fillWithEmptyStrings(shape[key]);
            }
          }
        }
      }
  
      return extracted;
    };
  
    return extract(source, shape);
  }

  /**
   * Fills null values at terminal nodes in the input object.
   * @param {Object} obj - The input object to fill null values in.
   * @returns {Object} - The new object with null values filled in.
   */
  function fillWithEmptyStrings(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Check if the property is an object and not an array
            if ( obj[key] && typeof obj[key] === 'object' || Array.isArray(obj[key]) && typeof obj[key] !== 'string') {
                // Recursive call for nested object
                fillWithEmptyStrings(obj[key]);
            } else {
                // Set terminal value to an empty string
                obj[key] = "";
            }
        }
    }
}

function replaceUndefinedWithNull(obj) {
  Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null && typeof obj[key] !== 'string') {
          // Recursive call for nested objects
          replaceUndefinedWithNull(obj[key]);
      } else if (obj[key] === undefined) {
          // Replace undefined with null
          obj[key] = null;
      }
  });
}


  exports.fillWithEmptyStrings = fillWithEmptyStrings;
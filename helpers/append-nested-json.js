const fs = require('fs');

/**
 * Merges an array of nested objects into a single object.
 *
 * @param {Object[]} objects - The array of objects to merge.
 * @returns {Object} - The merged object.
 */
function mergeNestedObjects(objects) {
  const merge = (target, source) => {
    Object.keys(source).forEach((key) => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) {
          // If the key doesn't exist in the target, simply add it
          target[key] = source[key];
        } else {
          // If the key is also an object in the target, merge the objects
          merge(target[key], source[key]);
        }
      } else {
        if (target.hasOwnProperty(key)) {
          // If there's a collision, create an array to hold both values
          if (!target[key]==source[key]) {
              merge(target[key], source[key])
          }
        } else {
          // Otherwise, just add the key-value pair
          target[key] = source[key];
        }
      }
    });
  };

  const result = {};

  // Merge each object into the result
  objects.forEach((object) => merge(result, object));

  return result;
}
  
module.exports = mergeNestedObjects;

/**
 * Recursively compares two objects for loose equality.
 * @param {Object} input - The expected object.
 * @param {Object} response - The actual object to compare against.
 */
function recursiveExpectObjectLooseEquality(input, response) {
    for(const key in input) {
        if(typeof input[key] !== 'object') {
            expect(response[key]).toBe(input[key]);
        } else {
            recursiveExpectObjectLooseEquality(input[key], response[key]);
        }
    }
}



exports.recursiveExpectObjectLooseEquality = recursiveExpectObjectLooseEquality;

/**
 * Recursively compares two objects for loose equality.
 * @param {Object} input - The expected object.
 * @param {Object} response - The actual object to compare against.
 */
function recursiveExpectObjectLooseEquality(input, response) {
    for(const key in input) {
        if(typeof input[key] !== 'object' || Array.isArray(input[key])) {
            // expect(response[key]).toBe(input[key]);
            if(response[key] !== input[key]) {
                throw new Error(`Expected ${response[key]} to be ${input[key]}`);
            }
        } else {
            recursiveExpectObjectLooseEquality(input[key], response[key]);
        }
    }
    return true;
}



exports.recursiveExpectObjectLooseEquality = recursiveExpectObjectLooseEquality;
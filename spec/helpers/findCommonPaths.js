function findCommonPaths(obj1, obj2) {
    function traverse(currentPath, obj1, obj2) {
        // Initialize the result as an empty object
        const result = {};

        // Iterate over the keys of the first object
        for (const key in obj1) {
            // Check if the key also exists in the second object
            if (obj2.hasOwnProperty(key)) {
                // If both values are objects, recurse deeper
                if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && obj1[key] !== null && obj2[key] !== null && !Array.isArray(obj1[key]) && !Array.isArray(obj2[key])) {
                    const nested = traverse(currentPath + '.' + key, obj1[key], obj2[key]);
                    if (Object.keys(nested).length > 0) {
                        result[key] = nested;
                    }
                } else {
                    // If the current path is a common terminal, record it
                    result[key] = null;
                }
            }
        }

        return result;
    }

    return traverse('', obj1, obj2);
}

exports.findCommonPaths = findCommonPaths;
const { findCommonPaths } = require('../helpers/findCommonPaths');

describe('findCommonPaths', () => {
    it('should return an object with only common paths between the two argument objects and all null values', () => {
        const obj1 = {
            a: {
                b: 2,
                c: {
                    d: 4
                }
            },
            e: 5
        };

        const obj2 = {
            a: {
                b: 3,
                c: {
                    d: 4,
                    f: 6
                }
            },
            g: 7
        };

        const expected = {
            a: {
                b: null,
                c: {
                    d: null
                }
            }
        };

        expect(findCommonPaths(obj1, obj2)).toEqual(expected);
    });
});

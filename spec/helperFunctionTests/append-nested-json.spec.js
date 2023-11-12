const mergeNestedObjects = require('../../helpers/append-nested-json');

describe('mergeNestedObjects', () => {
    it('should merge two objects with different properties', () => {
        const obj1 = { a: 1 };
        const obj2 = { b: 2 };
        const result = mergeNestedObjects([obj1, obj2]);
        expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should merge two objects with the same properties, where the first object\'s properties take precedence', () => {
        const obj1 = { a: 1 };
        const obj2 = { a: 2 };
        const result = mergeNestedObjects([obj1, obj2]);
        expect(result).toEqual({ a: 1 });
    });

    it('should merge nested objects', () => {
        const obj1 = { a: { b: 1 } };
        const obj2 = { a: { c: 2 } };
        const result = mergeNestedObjects([obj1, obj2]);
        expect(result).toEqual({ a: { b: 1, c: 2 } });
    });

    it('should merge multiple objects', () => {
        const obj1 = { a: 1 };
        const obj2 = { b: 2 };
        const obj3 = { c: { b: 1 } };
        const obj4 = { c: { c: 2 } };
        const result = mergeNestedObjects([obj1, obj2, obj3, obj4]);
        expect(result).toEqual({ a:1, c: { b: 1, c: 2 }, b: 2 });
    });
});

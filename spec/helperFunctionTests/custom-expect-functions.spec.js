const { recursiveExpectObjectLooseEquality } = require('../helpers/customExpectFunctions');

describe('recursiveExpectObjectLooseEquality', () => {
    it('should return true for two identical objects', () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { a: 1, b: { c: 2 } };
        expect(recursiveExpectObjectLooseEquality(obj1, obj2)).toBe(true);
    });

    it('should return true for two objects with extra properties in the second object', () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { a: 1, b: { c: 2 }, d: 3 };
        expect(recursiveExpectObjectLooseEquality(obj1, obj2)).toBe(true);
    });

    it('should fail and throw error for two objects with different values', () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { a: 1, b: { c: 3 } };
        expect(() => recursiveExpectObjectLooseEquality(obj1, obj2)).toThrowError();
    });

    it('should fail and throw error for two objects with different properties', () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { a: 1, b: { d: 3 } };
        expect(() => recursiveExpectObjectLooseEquality(obj1, obj2)).toThrowError();
    });
});

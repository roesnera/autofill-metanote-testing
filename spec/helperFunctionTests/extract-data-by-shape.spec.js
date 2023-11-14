const { extractDataByShape: extract } = require('../../helpers/extract-data-by-shape');

describe('extract', () => {
  it('should extract data from a source object based on a shape object', () => {
    const source = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      phoneNumbers: [
        { type: 'home', number: '555-1234' },
        { type: 'work', number: '555-5678' }
      ],
      somethingElse: {
        someAssortment: true,
        ofRandomCrap: 1337
      }
    };

    const shape = {
      name: '',
      age: 0,
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      phoneNumbers: [
        { type: '', number: '' }
      ]
    };

    const expected = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      phoneNumbers: [
        { type: 'home', number: '555-1234' },
        { type: 'work', number: '555-5678' }
      ]
    };

    const result = extract(source, shape);

    expect(result).toEqual(expected);
  });
});const { fillWithEmptyStrings } = require('../../helpers/extract-data-by-shape');

describe('fillWithEmptyStrings', () => {
  it('should fill all terminal values with empty strings', () => {
    const obj = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      phoneNumbers: [
        { type: 'home', number: '555-1234' },
        { type: 'work', number: '555-5678' }
      ]
    };

    const expected = {
      name: '',
      age: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      phoneNumbers: [
        { type: '', number: '' },
        { type: '', number: '' }
      ]
    };

    fillWithEmptyStrings(obj);

    expect(obj).toEqual(expected);
  });

  it('should handle empty objects and arrays', () => {
    const obj = {
      name: '',
      age: 0,
      address: {},
      phoneNumbers: []
    };

    const expected = {
      name: '',
      age: '',
      address: {},
      phoneNumbers: []
    };

    fillWithEmptyStrings(obj);

    expect(obj).toEqual(expected);
  });
});
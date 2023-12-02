const expect = require('chai').expect;
const paginateArray = require('../src/paginate');

describe('Paginate Array Function', () => {

  let collection;

  beforeEach(() => {
    // Generate an array of 20 objects
    collection = Array.from({ length: 20 }, (_, i) => ({ id: i }));
  });

  describe('Default Behavior', () => {
    it('should return 10 items by default', () => {
      const paginate = paginateArray(collection);
      expect(paginate.data.length).to.equal(10);
    });

    it('should return page 1 by default', () => {
      const paginate = paginateArray(collection);
      expect(paginate.currentPage).to.equal(1);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => paginateArray('string')).to.throw('Expected an array, but got string');
    });

    it('should return correct values for default parameters', () => {
      const paginate = paginateArray(collection);
      expect(paginate.currentPage).to.equal(1);
      expect(paginate.perPage).to.equal(10);
      expect(paginate.total).to.equal(20);
      expect(paginate.totalPages).to.equal(2);
      expect(paginate.data).to.eql(collection.slice(0, 10));
    });
  });

  describe('Custom Number of Items and Pages', () => {
    it('should return the specified number of items', () => {
      const paginate = paginateArray(collection, 1, 15);
      expect(paginate.data.length).to.equal(15);
    });

    it('should return items for the specified page', () => {
      const paginate = paginateArray(collection, 2, 5);
      expect(paginate.data).to.eql(collection.slice(5, 10));
    });
  });

  describe('Handling Edge Cases', () => {
    it('should handle empty array input', () => {
      const emptyArray = [];
      const paginate = paginateArray(emptyArray);
      expect(paginate.data).to.eql([]);
      expect(paginate.total).to.equal(0);
      expect(paginate.totalPages).to.equal(0);
    });

    it('should handle non-integer page and numItems values', () => {
      const paginate = paginateArray(collection, '3', 'two');
      expect(paginate.currentPage).to.equal(1); // Falls back to default
      expect(paginate.perPage).to.equal(10); // Falls back to default
    });

    it('should handle invalid page and numItems values (like negative numbers)', () => {
      const paginate = paginateArray(collection, -1, -10);
      expect(paginate.currentPage).to.equal(1); // Falls back to default
      expect(paginate.perPage).to.equal(10); // Falls back to default
    });
  });

  describe('Custom Return Object', () => {
    it('should allow adding custom properties to the return object', () => {
      const options = { customProperty: 'customValue' };
      const paginate = paginateArray(collection, 1, 10, options);
      expect(paginate.customProperty).to.equal('customValue');
    });

    it('should allow overriding existing properties in the return object', () => {
      const options = { currentPage: 3 };
      const paginate = paginateArray(collection, 1, 10, options);
      expect(paginate.currentPage).to.equal(3);
    });

    // Test with multiple custom properties
    it('should handle multiple custom properties', () => {
      const options = { customProperty1: 'value1', customProperty2: 2 };
      const paginate = paginateArray(collection, 1, 10, options);
      expect(paginate.customProperty1).to.equal('value1');
      expect(paginate.customProperty2).to.equal(2);
    });

    // Test with different types of values
    it('should handle different types of custom property values', () => {
      const options = { booleanValue: true, objectValue: { key: 'value' } };
      const paginate = paginateArray(collection, 1, 10, options);
      expect(paginate.booleanValue).to.be.true;
      expect(paginate.objectValue).to.eql({ key: 'value' });
    });
  });
});

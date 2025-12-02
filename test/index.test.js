import { jest, describe, it, expect } from '@jest/globals';
import { keyValuePairList } from '../index.js';

describe('KeyValuePairList', () => {
  describe('map', () => {
    it('should convert object to array with default keys', () => {
      const input = { a: 1, b: 2 };
      const expected = [
        { Name: 'a', Value: 1 },
        { Name: 'b', Value: 2 },
      ];
      expect(keyValuePairList.map(input)).toEqual(expected);
    });

    it('should convert object to array with custom keys', () => {
      const input = { a: 1, b: 2 };
      const expected = [
        { key: 'a', val: 1 },
        { key: 'b', val: 2 },
      ];
      expect(keyValuePairList.map(input, 'key', 'val')).toEqual(expected);
    });
  });

  describe('unmap', () => {
    it('should convert array to object with default keys', () => {
      const input = [
        { Name: 'a', Value: 1 },
        { Name: 'b', Value: 2 },
      ];
      const expected = { a: 1, b: 2 };
      expect(keyValuePairList.unmap(input)).toEqual(expected);
    });

    it('should convert array to object with custom keys', () => {
      const input = [
        { key: 'a', val: 1 },
        { key: 'b', val: 2 },
      ];
      const expected = { a: 1, b: 2 };
      expect(keyValuePairList.unmap(input, 'key', 'val')).toEqual(expected);
    });
  });

  describe('convert', () => {
    it('should call unmap when input is an array', () => {
      const input = [
        { Name: 'a', Value: 1 },
        { Name: 'b', Value: 2 },
      ];
      const expected = { a: 1, b: 2 };
      const spy = jest.spyOn(keyValuePairList, 'unmap');
      expect(keyValuePairList.convert(input)).toEqual(expected);
      expect(spy).toHaveBeenCalledWith(input, 'Name', 'Value');
      spy.mockRestore();
    });

    it('should call map when input is an object', () => {
      const input = { a: 1, b: 2 };
      const expected = [
        { Name: 'a', Value: 1 },
        { Name: 'b', Value: 2 },
      ];
      const spy = jest.spyOn(keyValuePairList, 'map');
      expect(keyValuePairList.convert(input)).toEqual(expected);
      expect(spy).toHaveBeenCalledWith(input, 'Name', 'Value');
      spy.mockRestore();
    });
  });

  describe('empty test', () => {
    it('empty map', () => {
      expect(keyValuePairList.map({})).toEqual([]);
    });

    it('empty unmap', () => {
      expect(keyValuePairList.unmap([])).toEqual({});
    });
  });

  describe('duplicate test', () => {
    it('duplicate unmap', () => {
      const input = [
        { Name: 'a', Value: 1 },
        { Name: 'a', Value: 2 },
      ];
      expect(keyValuePairList.unmap(input)).toEqual({ a: 2 });
    });
  });
});

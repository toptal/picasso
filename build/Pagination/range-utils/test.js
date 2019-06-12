"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const range_utils_1 = require("./range-utils");
describe('getRange({ activePage, totalPages, siblingCount })', () => {
    test('returns proper range 1', () => {
        const range = range_utils_1.getRange(5, 10, 2);
        expect(range).toEqual([1, range_utils_1.ELLIPSIS, 3, 4, 5, 6, 7, range_utils_1.ELLIPSIS, 10]);
    });
    test('returns proper range 2', () => {
        const range = range_utils_1.getRange(3, 5, 3);
        expect(range).toEqual([1, 2, 3, 4, 5]);
    });
    test('returns proper range 3', () => {
        const range = range_utils_1.getRange(1, 1, 3);
        expect(range).toEqual([1]);
    });
    test('returns proper range 4', () => {
        const range = range_utils_1.getRange(3, 3, 3);
        expect(range).toEqual([1, 2, 3]);
    });
    test('returns proper range 5', () => {
        const range = range_utils_1.getRange(10, 10, 3);
        expect(range).toEqual([1, range_utils_1.ELLIPSIS, 7, 8, 9, 10]);
    });
    test('returns proper range 6', () => {
        const range = range_utils_1.getRange(1, 2, 1);
        expect(range).toEqual([1, 2]);
    });
    test('returns proper range 7', () => {
        const range = range_utils_1.getRange(2, 2, 1);
        expect(range).toEqual([1, 2]);
    });
    test('returns proper range 8', () => {
        const range = range_utils_1.getRange(1, 3, 1);
        expect(range).toEqual([1, 2, 3]);
    });
    test('returns proper range 9', () => {
        const range = range_utils_1.getRange(2, 3, 1);
        expect(range).toEqual([1, 2, 3]);
    });
    test('returns proper range 10', () => {
        const range = range_utils_1.getRange(3, 3, 1);
        expect(range).toEqual([1, 2, 3]);
    });
    test('returns proper range 11', () => {
        const range = range_utils_1.getRange(1, 4, 1);
        expect(range).toEqual([1, 2, range_utils_1.ELLIPSIS, 4]);
    });
    test('returns proper range 12', () => {
        const range = range_utils_1.getRange(2, 4, 1);
        expect(range).toEqual([1, 2, 3, 4]);
    });
    test('returns proper range 13', () => {
        const range = range_utils_1.getRange(3, 4, 1);
        expect(range).toEqual([1, 2, 3, 4]);
    });
    test('returns proper range 14', () => {
        const range = range_utils_1.getRange(4, 4, 1);
        expect(range).toEqual([1, range_utils_1.ELLIPSIS, 3, 4]);
    });
    test('returns proper range 15', () => {
        const range = range_utils_1.getRange(1, 5, 1);
        expect(range).toEqual([1, 2, range_utils_1.ELLIPSIS, 5]);
    });
    test('returns proper range 16', () => {
        const range = range_utils_1.getRange(2, 5, 1);
        expect(range).toEqual([1, 2, 3, range_utils_1.ELLIPSIS, 5]);
    });
    test('returns proper range 17', () => {
        const range = range_utils_1.getRange(3, 5, 1);
        expect(range).toEqual([1, 2, 3, 4, 5]);
    });
    test('returns proper range 18', () => {
        const range = range_utils_1.getRange(4, 5, 1);
        expect(range).toEqual([1, range_utils_1.ELLIPSIS, 3, 4, 5]);
    });
    test('returns proper range 19', () => {
        const range = range_utils_1.getRange(5, 5, 1);
        expect(range).toEqual([1, range_utils_1.ELLIPSIS, 4, 5]);
    });
    test('returns proper range 20', () => {
        const range = range_utils_1.getRange(1234, 10000, 1);
        expect(range).toEqual([1, range_utils_1.ELLIPSIS, 1233, 1234, 1235, range_utils_1.ELLIPSIS, 10000]);
    });
});
//# sourceMappingURL=test.js.map
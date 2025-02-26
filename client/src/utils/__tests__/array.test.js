import { arrayUtil } from '../array';

describe('createArrayWithIndexes', () => {
    it('should be an array with one element', () => {
        expect(arrayUtil.createArrayWithIndexes(1)).toEqual([1]);
        expect(arrayUtil.createArrayWithIndexes(null)).toEqual([1]);
    });

    it('should be an array with several element', () => {
        expect(arrayUtil.createArrayWithIndexes(10)).toEqual([1,2,3,4,5,6,7,8,9,10]);
    });

    it('should be an empty array', () => {
        expect(arrayUtil.createArrayWithIndexes(0)).toEqual([]);
        expect(arrayUtil.createArrayWithIndexes(undefined)).toEqual([]);
    });
})


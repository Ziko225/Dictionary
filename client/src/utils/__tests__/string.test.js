import { stringUtil } from "../string";

describe('Stringutil', () => {
    describe('lastLetterFixer', () => {
        it('should return the number and word if the number ends with 1 (excluding 11)', () => {
            const number = 1;
            const result = stringUtil.lastLetterFixer(number, 'балл', 'балла', 'баллов');

            expect(result).toBe('1 балл');
        });

        it('should return the number and word2 if the number ends with 2 (excluding 12)', () => {
            const number = 2;
            const result = stringUtil.lastLetterFixer(number, 'балл', 'балла', 'баллов');

            expect(result).toBe('2 балла');
        });

        it('should return the number and word3 for other numbers', () => {
            const number = 12;
            const result = stringUtil.lastLetterFixer(number, 'балл', 'балла', 'баллов');

            expect(result).toBe('12 баллов');
        });

        it('should return the negative number and word2 for other numbers', () => {
            const number = -2;
            const result = stringUtil.lastLetterFixer(number, 'балл', 'балла', 'баллов');

            expect(result).toBe('-2 балла');
        });
    });

    describe('generateElementKey', () => {
        it('should generate a unique key', () => {
            const key = stringUtil.generateElementKey();

            expect(typeof key).toBe('string');
            expect(key.length).toBe(7);
        });
    });
});
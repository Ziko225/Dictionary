import { dateUtil } from '../date';

describe('Date from timestamp string', () => {
    it('should return undefined when dateString is empty', () => {
        const result = dateUtil.getDateFromTimeStampString('');
        expect(result).toBeUndefined();
    });

    it('should return expected date string when dateString is valid', () => {
        const dateString = '2022-05-01T10:30:00Z';
        const expectedDate = '2022-05-01';
        const result = dateUtil.getDateFromTimeStampString(dateString);
        expect(result).toBe(expectedDate);
    });

    it('should return expected date string when dateString contains additional information', () => {
        const dateString = '2022-05-01T10:30:00+00:00';
        const expectedDate = '2022-05-01';
        const result = dateUtil.getDateFromTimeStampString(dateString);
        expect(result).toBe(expectedDate);
    });
});

describe('Date from transformTime function', () => {
    it('should return 5 лет', () => {
        const result = dateUtil.transformTime(new Date(new Date().getTime() - 31536000000 * 5));
        expect(result).toBe('5 лет');
    });

    it('should return 2 года', () => {
        const result = dateUtil.transformTime(new Date(new Date().getTime() - 31536000000 * 2));
        expect(result).toBe('2 года');
    });

    it('should return 5 месяцев', () => {
        const result = dateUtil.transformTime(new Date(new Date().getTime() - 2419200000 * 5));
        expect(result).toBe('5 месяцев');
    });

    it('should return 2 месяца', () => {
        const result = dateUtil.transformTime(new Date(new Date().getTime() - 2419200000 * 2));
        expect(result).toBe('2 месяца');
    });

    it('should return 4 дня', () => {
        const result = dateUtil.transformTime(new Date(new Date().getTime() - 86400000 * 4));
        expect(result).toBe('4 дня');
    });

    it('should return 1 день', () => {
        const result = dateUtil.transformTime(new Date(new Date().getTime() - 86400000));
        expect(result).toBe('1 день');
    });

    it('should return 6 часов', () => {
        const result = dateUtil.transformTime(new Date(new Date().getTime() - 21600000));
        expect(result).toBe('6 часов');
    });

    it('should return 3 часа', () => {
        const result = dateUtil.transformTime(new Date(new Date().getTime() - 10800000));
        expect(result).toBe('3 часа');
    });

    it('should return 0 секунд', () => {
        const result = dateUtil.transformTime(undefined);
        expect(result).toBe('0 секунд');
    });
});

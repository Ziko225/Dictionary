import { objectUtil } from '../object';

const { getObjectWithoutEmptyValues, removeValueFromObject } = objectUtil;

describe('Object test', () => {
    it('should be object with only one params: name', () => {
        expect(getObjectWithoutEmptyValues({
            someUndefined: undefined,
            name: 'test',
            surname: '',
            age: null,
        })).toEqual({
            name: 'test'
        });
    });

    it('should be empty object', () => {
        expect(getObjectWithoutEmptyValues({
            someUndefined: undefined,
            name: NaN,
            surname: '',
            age: null,
        })).toEqual({});
    });

    it('should be object with values page:0, nextPage:1', () => {
        expect(getObjectWithoutEmptyValues({
            page: 0,
            nextPage: 1,
            someEmptyString: '',
            someEmptySpecialString: "",
            age: null,
        })).toMatchObject({
            page: 0,
            nextPage: 1,
        });
    });


    it('should be object without value nextPage', () => {
        expect(removeValueFromObject({
            page: 0,
            nextPage: 1,
            someEmptyString: '',
            someEmptySpecialString: "",
            age: null,
        }, 'nextPage')).toMatchObject({
            page: 0,
            someEmptyString: '',
            someEmptySpecialString: "",
            age: null,
        });
    });

    it('should be object without value someEmptySpecialString & page', () => {
        expect(removeValueFromObject({
            page: 0,
            nextPage: 1,
            someEmptyString: '',
            someEmptySpecialString: "",
            age: null,
        }, 'someEmptySpecialString', 'page')).toMatchObject({
            nextPage: 1,
            someEmptyString: '',
            age: null,
        });
    });
})


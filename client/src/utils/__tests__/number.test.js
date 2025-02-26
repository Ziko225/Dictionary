import { numberUtil } from '../number'

describe('Rounding util', ()=>{
    it('should return actual number if number is less than 50', ()=> {
        const number = 45
        const result = numberUtil.roundingNumber(number)
        expect(result).toBe(45)
    });
    
    it('should return rounded number without plus sign and as string', ()=> {
        const number = 110
        const result = numberUtil.roundingNumber(number)
        expect(result).toBe('110')
    });
    
    it('should return rounded number with plus sign and as string', ()=> {
        const number = 66
        const result = numberUtil.roundingNumber(number)
        expect(result).toBe('60+')
    })
})
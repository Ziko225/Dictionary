/**
 * @param {number} number
 *
 * @returns {number|string}
 */
const roundingNumber = (number) => {
    if (number <= 50) {
        return number
    } else {
        const rounded = Math.floor(number / 10) * 10;
        const plusSign = rounded < number ? '+' : '';
        return `${rounded}${plusSign}`;
    }
};

export const numberUtil = {
    roundingNumber
}

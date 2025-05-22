const pause = ms => new Promise(res => setTimeout(res, ms));

export const promiseUtils = {
    pause
};
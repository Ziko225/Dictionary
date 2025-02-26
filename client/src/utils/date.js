import { stringUtil } from './string';

/**
 * @param {string} dateString
 *
 * @returns {string|undefined}
 */
const getDateFromTimeStampString = (dateString) => {
    if (!dateString) {
        return;
    }
    return dateString.slice(0, dateString.indexOf("T"));
};

const transformTime = (createdAt) => {
    const currentTime = new Date().getTime();
    const utcSelectedTime = new Date(createdAt).getTime();

    const { lastLetterFixer } = stringUtil;

    const differentBtwCurrentAndSelectedTimeInSeconds = (currentTime - utcSelectedTime) / 1000;

    if (!createdAt || differentBtwCurrentAndSelectedTimeInSeconds <= 0) {
        return '0 секунд';
    }

    function formatTime(seconds = 0) {
        if (seconds >= 31536000) {
            const years = Math.floor(seconds / 31536000);

            return lastLetterFixer(years, 'год', 'года', 'лет');
        } else if (seconds >= 2419200) {
            const months = Math.floor(seconds / 2419200);

            return lastLetterFixer(months, 'месяц', 'месяца', 'месяцев');
        } else if (seconds >= 86400) {
            const days = Math.floor(seconds / 86400);

            return lastLetterFixer(days, 'день', 'дня', 'дней');
        } else if (seconds >= 3600) {
            const hours = Math.floor(seconds / 3600);

            return lastLetterFixer(hours, 'час', 'часа', 'часов');
        } else if (seconds >= 60) {
            const minutes = Math.floor(seconds / 60);

            return lastLetterFixer(minutes, 'минута', 'минуты', 'минут');
        } else {
            const second = Math.round(seconds);
            return lastLetterFixer(second, 'секунда', 'секунды', 'секунд');
        }
    }

    return formatTime(differentBtwCurrentAndSelectedTimeInSeconds);
};

export const dateUtil = {
    getDateFromTimeStampString,
    transformTime
};
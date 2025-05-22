import { useEffect, useState } from 'react';

const Counter = ({ ...props }) => {
    const [timerInMs, setTimerInMs] = useState(0);

    useEffect(() => {
        updateTimer();
        const timeoutId = setTimeout(() => location.reload(), getMsUntilNext9AM());
        const intervalId = setInterval(() => {
            updateTimer();
        }, 1000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

    const updateTimer = () => {
        setTimerInMs(getMsUntilNext9AM());
    };

    const getMsUntilNext9AM = () => {
        const now = new Date();
        const target = new Date();
        target.setHours(4, 0, 0, 0);

        if (now >= target) {
            target.setDate(target.getDate() + 1);
        }

        return target - now;
    };

    const totalSeconds = Math.floor(timerInMs / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return (
        <p {...props}>Time left until words reset: {hours}:{minutes}:{seconds}</p>
    );
};

export default Counter;
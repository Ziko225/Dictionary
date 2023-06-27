import { useState } from 'react';
import { httpPost } from "../http/http";

const useAuth = () => {
    const [isAuth, setIsAuth] = useState(true);

    const setIsUnAuth = () => {
        setIsAuth(false);
        return;
    };

    const addWordd = () => {

    };

    const login = async (e, password) => {
        e.preventDefault(e);

        const response = await httpPost("auth", { password });
        if (!response?.ok) {
            setIsAuth(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance('Добрий день!');
        window.speechSynthesis.speak(utterance);
        setIsAuth(true);
    };

    return { login, setIsUnAuth, isAuth, addWordd };
};

export default useAuth;

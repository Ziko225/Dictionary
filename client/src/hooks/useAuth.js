import { useState } from 'react';
import { httpPost } from "../http/http";

const useAuth = () => {
    const [isAuth, setIsAuth] = useState(true);

    const setIsUnAuth = () => {
        setIsAuth(false);
        return;
    };

    const login = async (e, password) => {
        e.preventDefault(e);

        const response = await httpPost("auth", { password });
        if (!response?.ok) {
            setIsAuth(false);
            return;
        }

        let utterance = new SpeechSynthesisUtterance("Welcome");
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
        setIsAuth(true);
    };

    return { login, setIsUnAuth, isAuth };
};

export default useAuth;

import { useContext, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../../context/authContext";

const useLogin = () => {
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const { setIsAuth } = useContext(AuthContext);

    const { getApi } = useHttp();

    const handleSubmit = async (e) => {
        e.preventDefault(e);

        setStatus("");

        const response = await getApi("auth", "POST", { password });

        setStatus(response?.status);

        if (!response?.ok) {
            return;
        }

        setIsAuth(true);
    };

    const handlePassword = (e) => {
        setPassword(e.currentTarget.value);
    };

    let message;

    if (status === 400) {
        message = "Password is incorrect. ";
    }

    return { handleSubmit, handlePassword, message };
};

export default useLogin;
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const useHttp = () => {
    const [isLoading, setIsloading] = useState(false);

    const { setIsOffline, setIsAuth, isOffline } = useContext(AuthContext);

    const getApi = async (path, method, data) => {
        const url = process.env.REACT_APP_URL || "";
        const urlWithPath = url + "/" + path;

        const responseTimeout = process.env.REACT_APP_RESPONSE_TIMEOUT || 2000;

        const headers = {
            "Content-Type": "application/json",
        };

        const credentials = "include";

        let response;

        data = data ? JSON.stringify(data) : null;

        const timeout = setTimeout(() => {
            response = null;

            setIsloading(false);
            setIsOffline(true);

            return response;
        }, responseTimeout);

        const stopTimer = () => {
            clearTimeout(timeout);
            setIsloading(false);

            if (isOffline) {
                setIsOffline(false);
            }
        };

        if (path === "words" || path === "verbs") {
            setIsloading(true);
        }

        const checkResponseStatus = (responseStatus) => {
            if (!responseStatus) {
                return null;
            }

            stopTimer();

            if (responseStatus === 401) {
                setIsAuth(false);
                return null;
            }

            if (responseStatus === 400) {
                return response;
            }
        };

        try {
            switch (method) {
                case "GET":
                    response = await fetch(urlWithPath, {
                        method: method,
                        origin: url,
                        credentials,
                        params: data,
                    });

                    break;
                case "POST":
                    response = await fetch(urlWithPath, {
                        method: method,
                        origin: url,
                        credentials,
                        headers,
                        body: data,
                    });
                    break;
                case "PUT":
                    response = await fetch(urlWithPath, {
                        method: method,
                        origin: url,
                        credentials,
                        headers,
                        body: data,
                    });
                    break;
                case "DELETE":
                    response = await fetch(urlWithPath, {
                        method: method,
                        origin: url,
                        credentials,
                        params: data,
                    });
                    break;
                default:
                    throw Error("The method is not correct");
            }

            const result = checkResponseStatus(response?.status);

            return result;
        } catch (error) {
            const result = checkResponseStatus(error?.response?.status);

            setIsOffline(true);

            return result;
        }
    };

    return { getApi, isLoading };
};

export default useHttp;
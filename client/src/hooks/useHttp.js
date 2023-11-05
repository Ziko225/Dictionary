const useHttp = () => {

    const getApi = async (path, method, data) => {
        const url = process.env.REACT_APP_URL || "";
        const urlWithPath = url + "/" + path;

        const headers = {
            "Content-Type": "application/json",
        };

        const credentials = "include";

        let response;

        try {
            data = data ? JSON.stringify(data) : null;

            switch (method) {
                case "GET":
                    console.log("with react")
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

            return response;
        } catch (error) {
            const responseStatus = error?.response?.status;


            if (responseStatus === 4) {

            }

            return null;
        }
    };

    return getApi;
};

export default useHttp;
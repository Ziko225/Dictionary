const url = import.meta.env.VITE_ENDPOINT;
const credentials = import.meta.env.VITE_CREDENTIALS;

const http = async (method, path, { params, body }) => {
    const formattedUrl = url[url.length - 1] === '/' ? url : `${url}/`;
    const formattedParams = params ? `?${new URLSearchParams(params).toString()}` : '';

    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        origin: url,
        credentials: credentials
    };

    try {
        if (body) {
            options.body = JSON.stringify(body);
        }
    } catch (error) {
        console.error(error);
    }

    const response = await fetch(`${formattedUrl}${path}${formattedParams}`, options);

    if (response.status >= 400) {
        const errorMsg = {
            status: response.status,
            statusText: response.statusText,
        };

        try {
            errorMsg.body = await response.json();
        } catch (error) {
            console.error(`The server did not send the 'json' data`);
        } finally {
            const error = new Error(response.statusText);
            error.details = errorMsg;

            throw error;
        }
    };

    return response;
};

export const API = {
    /**
     * @param {string} path 
     */
    async get(path, params) {
        return http('GET', path, { params });
    },

    /**
    * @param {string} path 
    */
    async post(path, body, params) {
        return http('POST', path, { body, params });
    },

    /**
    * @param {string} path 
    */
    async put(path, body, params) {
        return http('PUT', path, { body, params });
    },

    /**
    * @param {string} path 
    */
    async delete(path, params) {
        return http('DELETE', path, { params });
    },
};
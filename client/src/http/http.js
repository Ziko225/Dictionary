export const url = "http://mc.bychyk.it:5500";

export const httpPost = async (path, data) => {
    try {
        const response = await fetch(`${url}/${path}`, {
            method: "POST",
            origin: url,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        });

        return response;

    } catch (error) {
        console.error(error);
    }
};

export const httpGet = async (path = "", data = "") => {
    try {
        const response = await fetch(`${url}${path && "/" + path}${data && "/" + data}`, {
            method: "GET",
            origin: url,
            credentials: "include",
            params: data ? JSON.stringify(data) : undefined,
        });

        return response;

    } catch (error) {
        console.error(error);
    }
};

export const httpPut = async (path, data) => {
    try {
        const response = await fetch(`${url}/${path}`, {
            method: "PUT",
            origin: url,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        });

        return response;

    } catch (error) {
        console.error(error);
    }
};

export const httpRemove = async (path = "", data = "") => {
    try {
        const response = await fetch(`${url}${path && "/" + path}${data && "/" + data}`, {
            method: "DELETE",
            origin: url,
            credentials: "include",
            params: data ? JSON.stringify(data) : undefined,
        });

        return response;

    } catch (error) {
        console.error(error);
    }
};
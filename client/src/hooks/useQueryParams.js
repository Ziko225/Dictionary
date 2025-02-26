import { useSearchParams } from 'react-router-dom';
import { objectUtil } from '../utils/object';

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getQueryParams = () => {
        const paramsObject = {};

        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            paramsObject[param] = value;
        }

        return paramsObject;
    };

    const changeQueryParam = (key, value) => {
        const newObject = {
            ...queryParams,
            [key]: value
        };

        setSearchParams(newObject);
    };

    const deleteQueryParam = (...keys) => {
        const params = getQueryParams();

        const newParams = objectUtil.removeValueFromObject(params, ...keys);

        setSearchParams(newParams);
    };

    const queryParams = getQueryParams();

    return {
        queryParams,
        setNewQueryParams: setSearchParams,
        changeQueryParam,
        deleteQueryParam,
    };
};

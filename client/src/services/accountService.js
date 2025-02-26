import { API } from './api';

export const accountService = {
    /**
    * @returns {Promise<response>}
    */
    async getInfo() {
        const response = await API.get(`account/getinfo`);

        return response;
    },

    /**
     * @param {object} params 
     * @param {string} params.email
     * @param {string} params.password
     * @returns {Promise<response>}
     */
    async login(params) {
        const response = await API.post(`account/login`, params);

        return response;
    },

    /**
    * @param {object} params 
    * @param {string} params.email
    * @param {string} params.password
    * @returns {Promise<response>}
    */
    async registration(params) {
        const response = await API.post(`account/registration`, params);

        return response;
    },

    /**
   * @returns {Promise<response>}
   */
    async logOut() {
        const response = await API.get(`account/logout`);

        return response;
    },
};
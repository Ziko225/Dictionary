import { API } from './api';

export const dictionaryService = {
    /**
    * @returns {Promise<response>}
    */
    async getWords() {
        const response = await API.get(`dictionary/words`);

        return response;
    },

    /**
     * @returns {Promise<response>}
     */
    async getVerbs() {
        const response = await API.get(`dictionary/verbs`);

        return response;
    },

    /**
     * @param {object} params
     * @param {string} params.name
     * @param {string} params.translate
     * @returns {Promise<response>}
     */
    async addWord(params) {
        const response = await API.post(`dictionary/words`, params);

        return response;
    },

    /**
     * @param {object} params
     * @param {string} params.name
     * @param {string} params.v2
     * @param {string} params.v3
     * @param {string} params.translate
     * @returns {Promise<response>}
     */
    async addVerb(params) {
        const response = await API.post(`dictionary/verbs`, params);

        return response;
    },

    /**
    * @param {object} params
    * @param {number | string} params.id
    * @returns {Promise<response>}
    */
    async toggleIsLearnedWord(params) {
        const response = await API.put(`dictionary/words`, params);

        return response;
    },

    /**
    * @param {object} params
    * @param {number | string} params.id
    * @returns {Promise<response>}
    */
    async toggleIsLearnedVerb(params) {
        const response = await API.put(`dictionary/verbs`, params);

        return response;
    },

    /**
    * @param {object} params
    * @param {number | string} params.id
    * @returns {Promise<response>}
    */
    async deleteWord(params) {
        const response = await API.delete(`dictionary/words`, params);

        return response;
    },

    /**
    * @param {object} params
    * @param {number | string} params.id
    * @returns {Promise<response>}
    */
    async deleteVerb(params) {
        const response = await API.delete(`dictionary/verbs`, params);

        return response;
    },
};
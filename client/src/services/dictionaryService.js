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
};
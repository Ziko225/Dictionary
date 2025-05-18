import { filterStore } from 'store/filterStore';

const useFilter = () => {
    const {
        learned,
        unlearned,
        backward,
        toggleLearned,
        toggleUnlearned,
        toggleBackward
    } = filterStore();

    const getFilteredData = (data) => {
        if (!data) {
            return [];
        }

        if (learned && unlearned) {
            return data;
        }

        if (learned) {
            return data.filter((e) => e.learned);
        }

        if (unlearned) {
            return data.filter((e) => !e.learned);
        }

        return [];
    };

    const toggleHandler = (e) => {
        const value = e.currentTarget.value;

        if (value === "backward") {
            return toggleBackward();
        }

        if (value === "learned") {
            return toggleLearned();
        }

        toggleUnlearned();
    };

    return { learned, unlearned, backward, getFilteredData, toggleHandler };
};

export default useFilter;
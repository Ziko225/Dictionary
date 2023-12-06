import { useToggle } from "./useToggle";

const useFilter = () => {
    const [learned, toggleLearned] = useToggle(false);
    const [unlearned, toggleUnlearned] = useToggle(true);
    const [backward, toggleBackward] = useToggle(false);

    const getFilteredData = (data) => {
        if (!data) {
            return [];
        }

        if (learned && !unlearned) {
            return data.filter((e) => e.learned);
        }

        if (unlearned && !learned) {
            return data.filter((e) => !e.learned);
        }

        if (!unlearned && !learned) {
            return [];
        }
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

    const filter = { learned, unlearned, backward, getFilteredData, toggleHandler };

    return filter;
};

export default useFilter;
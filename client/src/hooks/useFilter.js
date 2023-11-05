import { useEffect, useState } from "react";
import { useToggle } from "./useToggle";

const useFilter = (data) => {
    const [learned, toggleLearned] = useToggle();
    const [unlearned, toggleUnlearned] = useToggle(true);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        if (!data) {
            return setFilteredData([]);
        }

        if (learned && !unlearned) {
            return setFilteredData(data.filter((e) => e.learned));
        }

        if (unlearned && !learned) {
            return setFilteredData(data.filter((e) => !e.learned));
        }

        if (!unlearned && !learned) {
           return setFilteredData([]);
        }

        setFilteredData(data);
    }, [data, learned, unlearned]);

    const toggleHandler = (e) => {
        const value = e?.currentTarget?.value;

        if (value === "learned") {
            return toggleLearned();
        }

        toggleUnlearned();
    };

    return { filteredData, learned, unlearned, toggleHandler };
};

export default useFilter;
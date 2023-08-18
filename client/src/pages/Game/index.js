import { useToggle } from "../../hooks/useToggle";
import { useState } from "react";
import useDictionary from "../../hooks/useDictionary";
import Filter from "../../components/Filter";

const Game = () => {
    const { data, add, removeWord, toggleIsLearned, speak, isOffline } = useDictionary(true);

    const [showLearned, toggleShowLearned] = useToggle(false);

    const [showUnLearned, toggleShowUnLearned] = useToggle(true);

    return (
        <>
            <Filter
                toggleUnLearned={toggleShowUnLearned}
                toggleLearned={toggleShowLearned}
                learned={showLearned}
                unlearned={showUnLearned}
            />
        </>
    );
};

export default Game;
import { useToggle } from "../../hooks/useToggle";
import { useState } from "react";
import useDictionary from "./useDictionary";
import Filter from "../../components/Filter";
import Words from "./Words";
import Verbs from "./Verbs";
import "./styles.css";

const Dictionary = ({ path }) => {
    const isWordsPage = path === "/";

    const { data, add, removeWord, toggleIsLearned, speak, isOffline } = useDictionary(isWordsPage);

    const [showLearned, toggleShowLearned] = useToggle(false);

    const [showUnLearned, toggleShowUnLearned] = useToggle(true);

    const [search, setSearch] = useState("");

    if (!data) {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }

    const filter = showLearned && showUnLearned
        ? data
        : data.filter((e) => e.learned === showLearned && e.learned !== showUnLearned);

    const filteredAndSearchData = filter.filter((e) => e.name.match(search.toLowerCase()));

    return (
        <>
            <Filter
                toggleUnLearned={toggleShowUnLearned}
                toggleLearned={toggleShowLearned}
                learned={showLearned}
                unlearned={showUnLearned}
            />

            <div className="search">
                {isOffline ? <h1>Offline</h1> : null}
                <input className="search__input" onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Search" />
            </div>
            {isWordsPage
                ? <Words
                    addWord={add}
                    remove={removeWord}
                    toggleIsLearned={toggleIsLearned}
                    speak={speak}
                    words={filteredAndSearchData}
                    isOffline={isOffline}
                />
                : <Verbs
                    addVerb={add}
                    remove={removeWord}
                    toggleIsLearned={toggleIsLearned}
                    speak={speak}
                    verbs={filteredAndSearchData}
                    isOffline={isOffline}
                />
            }
        </>
    );
};

export default Dictionary;
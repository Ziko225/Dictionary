import { useState } from "react";
import useDictionary from "../../hooks/useDictionary";
import useFilter from "../../hooks/useFilter";
import Filter from "../../components/Filter";
import Words from "./Words";
import Verbs from "./Verbs";
import "./styles.css";

const Dictionary = ({ path }) => {
    const isWordsPage = path === "/";

    const { data, add, removeWord, toggleIsLearned, speak, isOffline } = useDictionary(isWordsPage);

    const { filteredData, learned, unlearned, toggleHandler } = useFilter(data);

    const [search, setSearch] = useState("");

    if (!filteredData) {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }

    const searchData = filteredData.filter((e) => e.name.match(search.toLowerCase()));

    return (
        <>
            <Filter
                toggleHandler={toggleHandler}
                learned={learned}
                unlearned={unlearned}
            />

            <div className="search">
                {isOffline ? <h1>Offline</h1> : null}
                <input
                    className="search__input"
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    placeholder="Search"
                />
            </div>
            {isWordsPage
                ? <Words
                    addWord={add}
                    remove={removeWord}
                    toggleIsLearned={toggleIsLearned}
                    speak={speak}
                    words={searchData}
                    isOffline={isOffline}
                />
                : <Verbs
                    addVerb={add}
                    remove={removeWord}
                    toggleIsLearned={toggleIsLearned}
                    speak={speak}
                    verbs={searchData}
                    isOffline={isOffline}
                />
            }
        </>
    );
};

export default Dictionary;
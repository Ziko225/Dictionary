import { useContext, useState } from "react";
import useDictionary from "../../hooks/useDictionary";
import Filter from "../../components/Filter";
import Words from "./Words";
import Verbs from "./Verbs";
import Loading from "../../components/Loading";
import { FilterContext } from "../../context/filterContext";
import { ReactComponent as SearchIco } from "./search.svg";

const Dictionary = ({ path }) => {
    const isWordsPage = path === "/";

    const { data, add, removeWord, toggleIsLearned, speak, isOffline, isLoading } = useDictionary(isWordsPage);

    const { getFilteredData, learned, unlearned, toggleHandler } = useContext(FilterContext);

    const filteredData = getFilteredData(data);

    const [search, setSearch] = useState("");

    if (isLoading || !filteredData) {
        return (
            <Loading />
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
                {isOffline && <h1>Offline</h1>}
                <input
                    className="search__input"
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    placeholder="Search"
                />
                <SearchIco className="search__ico"/>
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
import { useEffect, useState } from 'react';

import { useQueryParams } from '../../hooks/useQueryParams';

import { queryKeys } from '../../constants';

import SearchIco from "./search.svg?react";

import "./styles.scss";


const Search = () => {
    const [fixSearch, setFixSearch] = useState(false);

    const { changeQueryParam, deleteQueryParam } = useQueryParams();

    useEffect(() => {
        window.addEventListener("scroll", windowSearchHandler);

        return () => {
            window.removeEventListener("scroll", windowSearchHandler);
        };
    }, []);

    const up = () => {
        window.scrollTo(0, 0);
    };

    const windowSearchHandler = () => {
        if (window.scrollY > 200) {
            setFixSearch(true);
        } else if (window.scrollY < 100) {
            setFixSearch(false);
        }
    };

    const setSearch = (search) => {
        if (!search) {
            return deleteQueryParam(queryKeys.search);
        }

        changeQueryParam(queryKeys.search, search);
    };

    return (
        <div className={fixSearch ? "fixedSearch" : ''}>
            <div className="search">
                <input
                    className="search__input"
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    placeholder="Search"
                />
                <SearchIco className="search__ico" />
            </div>
            {fixSearch && <button onClick={up} className="fixedSearch__button">Up</button>}
        </div>
    );
};

export default Search;
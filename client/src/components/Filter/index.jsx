import { useContext } from "react";
import { FilterContext } from "../../context/filterContext";

import "./styles.scss";

const Filter = ({ game }) => {
    const { learned, unlearned, backward, toggleHandler } = useContext(FilterContext);

    return (
        <div className="filter">
            <div className="filter__block">
                <button value="learned" onClick={toggleHandler} className={`block__button ${learned ? "active" : ""}`} />
                <span className="block__text">Show learned</span>
            </div>
            <div className="filter__block">
                <button value="unlearned" onClick={toggleHandler} className={`block__button ${unlearned ? "active" : ""}`} />
                <span className="block__text">Show unlearned</span>
            </div>
            {game &&
                <div className="filter__block">
                    <button value="backward" onClick={toggleHandler} className={`block__button ${backward ? "active" : ""}`} />
                    <span className="block__text">Backwards words</span>
                </div>
            }
        </div>
    );
};

export default Filter;
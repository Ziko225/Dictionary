const Filter = ({ learned, unlearned, toggleHandler }) => {

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
        </div>
    );
};

export default Filter;
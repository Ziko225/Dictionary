import "./styles.css";

const Filter = ({ learned, unlearned, toggleLearned, toggleUnLearned }) => {

    return (
        <div className="filter">
            <div className="filter__block">
                <button onClick={toggleLearned} className={`block__button ${learned ? "active" : ""}`} />
                <span className="block__text">Show learned</span>
            </div>
            <div className="filter__block">
                <button onClick={toggleUnLearned} className={`block__button ${unlearned ? "active" : ""}`} />
                <span className="block__text">Show unlearned</span>
            </div>
        </div>
    );
};

export default Filter;
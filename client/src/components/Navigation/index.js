import { NavLink } from "react-router-dom";
import { gamePath, verbsPath, wordsPath } from "../../AppRouter";
import './styles.css';

const Navigation = () => {

    return (
        <nav className="nav">
            <NavLink className="nav__button" to={wordsPath}>Words</NavLink>
            <NavLink className="nav__button" to={verbsPath}>Irregular verbs</NavLink>
            <NavLink className="nav__button" to={gamePath}>Game</NavLink>
        </nav>
    );
};

export default Navigation;
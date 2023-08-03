import { NavLink } from "react-router-dom";
import { verbsPath, wordsPath } from "../../AppRouter";
import './styles.css';

const Navigation = () => {

    return (
        <nav className="nav">
            <NavLink className="nav__button" to={wordsPath}>Words</NavLink>
            <NavLink className="nav__button" to={verbsPath}>Irregular verbs</NavLink>
        </nav>
    );
};

export default Navigation;
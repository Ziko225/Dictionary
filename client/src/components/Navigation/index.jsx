import { useContext } from 'react';
import { Link, NavLink } from "react-router-dom";

import { useToggle } from '../../hooks/useToggle';

import { AuthContext } from '../../context/authContext';

import { ReactComponent as Avatar } from './avatar.svg';
import { ReactComponent as BurgerIco } from "./burger.svg";

import { paths } from '../../constants';

import "./styles.scss";

const Navigation = () => {
    const { userData } = useContext(AuthContext);
    const [isMobileBarActive, toggleMobileBarActive, setMobileBarActive] = useToggle(false);

    const closeMobileBar = () => {
        setMobileBarActive(false);
    };

    return (
        <div className='navigation'>
            <div
                className={`navigation__hideBG${isMobileBarActive ? ' navigation__hideBG--active' : ''}`}
                onClick={closeMobileBar}>
            </div>
            <button onClick={() => toggleMobileBarActive()} className='navigation__burgerButton'>
                <BurgerIco />
            </button>

            <nav className={`navigation__nav${isMobileBarActive ? ' navigation__nav--active' : ''}`}>
                <NavLink onClick={closeMobileBar} className="nav__link" to={paths.wordsPath}>Words</NavLink>
                <NavLink onClick={closeMobileBar} className="nav__link" to={paths.verbsPath}>Irregular verbs</NavLink>
                <NavLink onClick={closeMobileBar} className="nav__link" to={paths.gamePath}>Game</NavLink>
            </nav>
            <Link className='navigation__userButton' to={paths.settingsPath}>
                <p className='userButton__font1'>{userData.username}</p>
                <p className='userButton__font2'>
                    {userData.email}
                </p>
                <Avatar />
            </Link>
        </div>
    );
};

export default Navigation;
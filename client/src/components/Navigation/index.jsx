import { Link, NavLink } from "react-router-dom";
import { paths } from '../../constants';
import { ReactComponent as Avatar } from './avatar.svg';

import "./styles.scss";
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';


const Navigation = () => {
    const { userData } = useContext(AuthContext);

    console.log(userData)

    return (
        <div className='navigation'>
            <nav className="nav">
                <NavLink className="nav__button" to={paths.wordsPath}>Words</NavLink>
                <NavLink className="nav__button" to={paths.verbsPath}>Irregular verbs</NavLink>
                <NavLink className="nav__button" to={paths.gamePath}>Game</NavLink>
            </nav>
            <Link className='userButton' to={paths.settingsPath}>
                <p className='userButton__font1'>{userData.nickname}</p>
                <p className='userButton__font2'>
                    {userData.email}
                </p>
                <Avatar />
            </Link>
        </div>
    );
};

export default Navigation;
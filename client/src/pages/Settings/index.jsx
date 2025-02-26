import { useContext } from 'react';
import { accountService } from '../../services/accountService';
import { AuthContext } from '../../context/authContext';

const Settings = () => {
    const { setStatus } = useContext(AuthContext);

    const logOut = async () => {
        try {
            await accountService.logOut();

            setStatus('isAuth', false);
        } catch (error) {
            alert('Something get wrong, try again later');
        }
    };

    return (
        <>
            <h2>
                settings
            </h2>
            <button onClick={logOut}>Log-out</button>
        </>
    );
};

export default Settings;
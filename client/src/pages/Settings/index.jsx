import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToggle } from '../../hooks/useToggle';

import { accountService } from '../../services/accountService';

import { AuthContext } from '../../context/authContext';

import SettingField from './components/SettingField';

import { speakLanguages } from './variables';
import { paths } from '../../constants';

import './styles.scss';

const Settings = () => {
    const { setStatus, userData, setUserData } = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        newEmail: '',
        username: '',
        password: '',
        language: ''
    });

    const navigate = useNavigate();

    const [doesEmailChange, toggleEmailChange, setEmailChange] = useToggle(false);
    const [doesUsernameChange, toggleUsernameChange, setUsernameChange] = useToggle(false);
    const [doesPasswordChange, togglePasswordChange, setPasswordChange] = useToggle(false);
    const [doesVoiceLanguageChange, toggleVoiceLanguageChange, setVoiceLanguageChange] = useToggle(false);

    const isEdditFieldOpen = doesEmailChange || doesUsernameChange || doesPasswordChange || doesVoiceLanguageChange;
    const selectedLanguage = speakLanguages.find((e) => e.code === userData.language)?.language || 'Not selected';

    const changeFormData = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    const changeSettings = async (event) => {
        try {
            event.preventDefault();
            setErrorMessage('');

            const response = await accountService.changeSettings(formData);

            setEmailChange(false);
            setUsernameChange(false);
            setPasswordChange(false);
            setVoiceLanguageChange(false);

            setUserData(await response.json());

            navigate(paths.wordsPath);
        } catch (error) {
            const status = error?.details?.status;

            if (status === 400) {
                return setErrorMessage('Not all fields are correct, check your email');
            }

            if (status === 409) {
                return setErrorMessage('This email already used');
            }

            if (status === 500) {
                return setErrorMessage('Something get wrong, try again later');
            }
        }
    };

    const logOut = async () => {
        try {
            await accountService.logOut();

            setUserData({
                email: '',
                username: '',
                language: '',
            });
            setStatus('isAuth', false);
        } catch (error) {
            alert('Something get wrong, try again later');
        }
    };

    return (
        <div className='container'>
            <div className='settings'>
                <h1 className='settings__title'>
                    Settings
                </h1>
                <div className='line' />
                <form onSubmit={changeSettings}>
                    <SettingField
                        title="Email:"
                        value={userData.email}
                        toggler={toggleEmailChange}
                        isOpen={doesEmailChange}
                        type="email"
                        placeholder="New email"
                        onChange={(e) => changeFormData('newEmail', e.currentTarget.value)}
                    />
                    <SettingField
                        title="Username:"
                        value={userData.username}
                        toggler={toggleUsernameChange}
                        isOpen={doesUsernameChange}
                        placeholder="New username"
                        onChange={(e) => changeFormData('username', e.currentTarget.value)}
                    />
                    <SettingField
                        title="Password:"
                        value="****"
                        toggler={togglePasswordChange}
                        isOpen={doesPasswordChange}
                        minLength="6"
                        type="password"
                        placeholder="New password"
                        onChange={(e) => changeFormData('password', e.currentTarget.value)}
                    />
                    <div className='line' />
                    <SettingField
                        title="Voice language:"
                        value={selectedLanguage}
                        toggler={toggleVoiceLanguageChange}
                        isOpen={doesVoiceLanguageChange}
                        placeholder="New password"
                    >
                        <select onChange={(e) => changeFormData('language', e.currentTarget.value)}>
                            <option value="">
                                Choose a language
                            </option>
                            {speakLanguages.map(({ language, code }, index) =>
                                <option
                                    key={index}
                                    className={`${code === userData.language ? 'selected' : ''}`}
                                    value={code}>
                                    {language}
                                </option>
                            )}
                        </select>
                    </SettingField>
                    {
                        isEdditFieldOpen &&
                        <button className="settings__button">
                            Save
                        </button>
                    }
                    <p className='error'>
                        {errorMessage}
                    </p>
                </form>
                <button
                    className='settings__button settings__button--exitButton'
                    onClick={logOut}>
                    Log-out
                </button>
            </div>
        </div>
    );
};

export default Settings;
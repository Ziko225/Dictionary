import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryParams } from '../../hooks/useQueryParams';

import { AuthContext } from '../../context/authContext';
import { accountService } from '../../services/accountService';

import { paths } from '../../constants';

import './styles.scss';

const Auth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const { setStatus } = useContext(AuthContext);

    const navigate = useNavigate();

    const { queryParams, changeQueryParam, deleteQueryParam } = useQueryParams();

    const queryTypeKey = 'type';
    const queryRegistrationKey = 'registration';
    const isRegistration = queryParams[queryTypeKey] === queryRegistrationKey;

    const submitInput = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(e);

        const selectedService = isRegistration ? accountService.registration : accountService.login;

        try {
            setErrorMsg('');

            if (isRegistration && formData.password !== formData.password2) {
                return setErrorMsg('Passwords do not match');
            }

            const response = await selectedService({ email: formData.email, password: formData.password });

            if (!response.ok) {
                throw new Error('Something get wrong');
            }

            navigate(paths.wordsPath);
            setStatus('isAuth', true);
        } catch (error) {
            console.error(error);
            if (error?.details?.status === 400) {
                return setErrorMsg('Incorrect password or email');
            }

            if (error?.details?.status === 409) {
                return setErrorMsg('This account already exist');
            }

            setErrorMsg('Something get wrong, check your internet or try again later');
        }
    };

    const toggleRegistration = () => {
        if (queryParams[queryTypeKey] === queryRegistrationKey) {
            return deleteQueryParam(queryTypeKey);
        }

        changeQueryParam(queryTypeKey, queryRegistrationKey);
    };

    return (
        <div className="auth">
            <h1 className="title">
                {isRegistration
                    ? 'Registration'
                    : 'Login'
                }
            </h1>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                    required
                    className="input"
                    autoComplete='email'
                    type="email"
                    onChange={(e) => submitInput('email', e.currentTarget.value)}
                    placeholder="Email"
                />
                <input
                    required
                    className="input"
                    autoComplete='current-password'
                    type="password"
                    minLength="6"
                    onChange={(e) => submitInput('password', e.currentTarget.value)}
                    placeholder="Password"
                />
                {isRegistration &&
                    <input
                        required
                        className="input"
                        autoComplete='current-password'
                        type="password"
                        minLength="6"
                        onChange={(e) => submitInput('password2', e.currentTarget.value)}
                        placeholder="Repeat password"
                    />
                }
                <button type="submit" className="button">
                    {isRegistration
                        ? 'Sign-up'
                        : 'Sign-in'
                    }
                </button>
            </form>
            <button onClick={toggleRegistration} className="toggleButton">
                {
                    isRegistration
                        ? 'Have an account?'
                        : `Don't have an account?`
                }
            </button>
            <p className="error">{errorMsg}</p>

        </div>
    );
};

export default Auth;
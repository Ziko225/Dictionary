import { useEffect } from 'react';

import { accountService } from 'services/accountService';

import { userStore } from 'store/userStore';

import AppRouter from './AppRouter';

import Auth from 'pages/Auth';

import Navigation from 'components/Navigation';
import Loading from 'components/Loading';

import './globalStyles.scss';
import 'normalize.css';

function App() {
    const {
        isAuth,
        isLoading,
        changeIsLoading,
        changeIsAuth,
        changeUserData
    } = userStore();

    useEffect(() => {
        checkIsAuth();
    }, []);

    const checkIsAuth = async () => {
        try {
            const response = await accountService.getInfo();

            if (!response.ok) {
                return changeIsAuth(false);
            }

            changeUserData(await response.json());

            changeIsAuth(true);
        } catch (error) {
            changeIsAuth(false);
        } finally {
            changeIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        isAuth
            ? <>
                <Navigation />
                <AppRouter />
            </>
            : <Auth />
    );
}

export default App;
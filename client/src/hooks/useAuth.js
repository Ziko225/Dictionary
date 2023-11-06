import { useState } from 'react';

const useAuth = () => {
    const [isAuth, setIsAuth] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    return { setIsAuth, setIsOffline, isAuth, isOffline,  };
};

export default useAuth;

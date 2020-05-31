import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export function useAuth() {
    const [ready, setReady] = useState(false);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [type, setType] = useState(null);

    const login = useCallback((userId, userToken, userType) => {
        setToken(userToken);
        setId(userId);
        setType(userType);

        localStorage.setItem(storageName, JSON.stringify({
            id: userId, token: userToken, type: userType
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setId(null);
        setType(null);

        localStorage.removeItem(storageName);
    }, []);
    // за счёт этого useEffect у нас не слетает login
    // после перезагрузки страницы
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.id, data.token, data.type);
        }
        setReady(true);
    }, [login]);

    return { login, logout, token, id, type, ready }
}
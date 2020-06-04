import { createContext } from 'react';

export const AuthContext = createContext({
    token: null,
    id: null,
    type: null,
    ready: null,
    login: () => {},
    logout: () => {},
    isAuth: false
});
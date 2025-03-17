import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {loginApi} from './usersApi';

const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    authenticationError: '',
    token: '',
};

export const UserContext = React.createContext(initialState);

export const UserProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    const loginCallback = useCallback(async (username, password) => {
        setState(prevState => ({ ...prevState, isAuthenticating: true, authenticationError: '' }));
        try {
            const { token } = await loginApi(username, password);
            setState({ ...initialState, isAuthenticated: true, token });
        } catch (error) {
            console.error('Login failed:', error);
            setState(prevState => ({
                ...prevState,
                authenticationError: 'AUTH_ERROR',
                isAuthenticating: false,
            }));
        }
    }, []);

    const logoutCallback = useCallback(async () => {
        setState(initialState);
    }, []);


    const login = useCallback(loginCallback, [loginCallback]);
    const logout = useCallback(logoutCallback, [logoutCallback]);

    const value = {
        isAuthenticated: state.isAuthenticated,
        isAuthenticating: state.isAuthenticating,
        authenticationError: state.authenticationError,
        token: state.token,
        login,
        logout,
    };

    /*
    useEffect(() => {
        const checkToken = async () => {
            if (token && !state.isAuthenticated) {
                setState(prevState => ({ ...prevState, isAuthenticated: true, token }));
            }
        };
        checkToken();
    }, [state.isAuthenticated]);

     */

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

UserContext.propTypes = {
    children: PropTypes.node.isRequired,
};

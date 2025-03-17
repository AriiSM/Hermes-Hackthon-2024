import React, {useCallback, useContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import {getMails, newWebSocket} from './ItemsApi';
import {UserContext} from "../auth/UserProvider";

const initialState = {
    mails: [],
    fetching: false,
    fetchingError: null,
    saving: false,
    savingError: null,
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'FETCHING':
            return { ...state, fetching: true };
        case 'FETCH_SUCCESS':
            return { ...state, mails: payload.items, fetching: false };
        case 'FETCH_FAILURE':
            return { ...state, fetching: false, fetchingError: payload.error };
        default:
            return state;
    }
};

const initializeState = (initialState) => {
    return { ...initialState };
};

// Use the same name for the context and provider to avoid confusion
export const MailContext = React.createContext(initialState);

export const MailsProvider = ({ children }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE3MzE3ODcwODgsImV4cCI6MTczMjAwMzA4OH0.fl3XLNrhjh_MKVLtDX4fjBqXf4Y41Kx_ZDOIuG0I_cM";
    const [state, dispatch] = useReducer(reducer, initialState, initializeState);
    const { mails, fetching, fetchingError, saving, savingError } = state;

    const fetchMails = useCallback(async () => {
        try {
            dispatch({ type: 'FETCHING' });
            console.log('fetchMails started');
            const items = await getMails(token);
            dispatch({ type: 'FETCH_SUCCESS', payload: { items } });
        } catch (error) {
            console.log('fetchMails failed', error);
            dispatch({ type: 'FETCH_FAILURE', payload: { error } });
        }
    }, [token]);

    const value = {
        mails,
        fetching,
        fetchingError,
        saving,
        savingError,
        fetchMails,
    };

    return (
        <MailContext.Provider value={value}>
            {children}
        </MailContext.Provider>
    );
};

MailsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

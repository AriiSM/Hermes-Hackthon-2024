import React, {useCallback, useContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import { getProfiles, newWebSocket } from './ItemsApi';
import {UserContext} from "../auth/UserProvider";

const initialState = {
    profiles: [],
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
            return { ...state, profiles: payload.items, fetching: false };
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
export const ProfileContext = React.createContext(initialState);

export const ProfilesProvider = ({ children }) => {
    const { token } = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE3MzE3ODcwODgsImV4cCI6MTczMjAwMzA4OH0.fl3XLNrhjh_MKVLtDX4fjBqXf4Y41Kx_ZDOIuG0I_cM";
    const [state, dispatch] = useReducer(reducer, initialState, initializeState);
    const { profiles, fetching, fetchingError, saving, savingError } = state;

    const fetchProfiles = useCallback(async () => {
        try {
            dispatch({ type: 'FETCHING' });
            console.log('fetchProfiles started');
            const items = await getProfiles(token); // Pass the token to the API call
            dispatch({ type: 'FETCH_SUCCESS', payload: { items } });
        } catch (error) {
            console.log('fetchProfiles failed', error);
            dispatch({ type: 'FETCH_FAILURE', payload: { error } });
        }
    }, []);

    const value = {
        profiles,
        fetching,
        fetchingError,
        saving,
        savingError,
        fetchProfiles,
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

ProfilesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

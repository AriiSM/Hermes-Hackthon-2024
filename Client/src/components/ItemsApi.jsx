import axios from 'axios';
import { authConfig, baseUrl } from '../core';

const profileUrl = `http://${baseUrl}/api`;

export const getProfiles = async (token) => {
    const url = `${profileUrl}/profiles/`;
    try {
        const response = await axios.get(url, authConfig(token));
        return response.data; // Return the profile data
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error; // Propagate the error to the caller
    }
};

export const getMails = async (token) => {
    const url = `${profileUrl}/emails/`;
    try {
        const response = await axios.get(url, authConfig(token));
        return response.data; // Return the mail data
    } catch (error) {
        console.error('Error fetching mails:', error);
        throw error; // Propagate the error to the caller
    }
};

export const newWebSocket = (token, onMessage) => {
    const ws = new WebSocket(`ws://${baseUrl}`);

    ws.onopen = () => {
        console.log('WebSocket connection opened');
        ws.send(JSON.stringify({ type: 'authorization', payload: { token } }));
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
        console.error('WebSocket encountered an error:', error);
    };

    ws.onmessage = (messageEvent) => {
        console.log('WebSocket message received');
        try {
            const data = JSON.parse(messageEvent.data);
            onMessage(data);
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    return () => {
        ws.close();
    };
};

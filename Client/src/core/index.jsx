export const baseUrl = 'localhost:3000';

export const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const authConfig = (token) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
});

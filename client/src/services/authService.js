import api from './api.js';

export const register = (username, email, password) => {
    const user = {
        username,
        email,
        password
    };

    return fetch(api.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .catch(err => console.error(err));
}

export const login = (email, password) => {
    const user = {
        email,
        password
    };

    console.log(api.login);

    return fetch(api.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .catch(err => console.error(err));
}

export const logout = () => {
    return localStorage.clear();
}

export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null ? true : false;
}

export const isAdmin = () => {
    return localStorage.getItem('isAdmin') === 'true' ? true : false;
}

export const getUsername = () => {
    return localStorage.getItem('username');
}

export const getToken = () => {
    return localStorage.getItem('token');
}
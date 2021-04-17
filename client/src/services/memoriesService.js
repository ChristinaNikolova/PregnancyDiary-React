import api from './api.js';
import { requester } from './requester.js';

export const create = (date, title, content, weekId) => {
    const memory = {
        date,
        title,
        content,
        weekId
    };

    const url = `${api.createMemory}`;

    return requester(url, 'POST', memory)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const allCurrentWeek = (weekId) => {
    const url = `${api.getAllMemoriesCurrentWeek}/${weekId}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const remove = (id) => {
    const url = `${api.removeMemory}/${id}`;

    return requester(url, 'DELETE')
        .then(res => res.json())
        .catch(err => console.error(err));
};
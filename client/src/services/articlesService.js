import api from './api.js';

export const all = () => {
    return fetch(api.allArticles)
        .then(res => res.json())
        .catch(err => console.error(err));
};

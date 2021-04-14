import api from './api.js';

export const getArticlesCountByCategories = () => {
    return fetch(api.articlesCountByCategories)
        .then(res => res.json())
        .catch(err => console.error(err));
}

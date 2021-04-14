import api from './api.js';

export const all = () => {
    return fetch(api.allArticles)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const allCurrentCategory = (categoryId) => {
    return fetch(`${api.allArticlesCurrentCategory}/${categoryId}`)
        .then(res => res.json())
        .catch(err => console.error(err));
}

export const search = (query) => {
    return fetch(`${api.searchArticles}/${query}`)
        .then(res => res.json())
        .catch(err => console.error(err));
}
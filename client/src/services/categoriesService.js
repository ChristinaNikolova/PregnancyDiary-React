import api from './api.js';

export const getArticlesCountByCategories = () => {
    return fetch(api.articlesCountByCategories)
        .then(res => res.json())
        .catch(err => console.error(err));
}

export const getCategoryNameById = (categoryId) => {
    return fetch(`${api.categoryNameById}/${categoryId}`)
        .then(function (body) {
            return body.text();
        })
        .catch(err => console.error(err));
}

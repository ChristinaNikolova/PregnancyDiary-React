import api from './api.js';
import { requester } from './requester.js';

export const getArticlesCountByCategories = () => {
    const url = api.articlesCountByCategories;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getCategoryNameById = (categoryId) => {
    const url = `${api.categoryNameById}/${categoryId}`;

    return requester(url, 'GET')
        .then(function (body) {
            return body.text();
        })
        .catch(err => console.error(err));
};

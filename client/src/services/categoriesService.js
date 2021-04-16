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

export const getAllForAdministration = () => {
    const url = `${api.adminAllCategories}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const removeFromAdmin = (id) => {
    const url = `${api.removeCategory}/${id}`;

    return requester(url, 'DELETE')
        .then(res => res.json())
        .catch(err => console.error(err));
};

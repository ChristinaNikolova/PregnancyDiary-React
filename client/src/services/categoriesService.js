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

export const remove = (id) => {
    const url = `${api.removeCategory}/${id}`;

    return requester(url, 'DELETE')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getCategoryForUpdate = (id) => {
    const url = `${api.adminGetCategoryForUpdate}/${id}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const update = (id, name, picture) => {
    const category = {
        id,
        name,
        picture
    };

    const url = `${api.adminUpdateCategory}`;

    return requester(url, 'PUT', category)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const create = (name, picture) => {
    const category = {
        name,
        picture
    };

    const url = `${api.adminCreateCategory}`;

    return requester(url, 'POST', category)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getAllNames = () => {
    const url = api.allCategoriesNames;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

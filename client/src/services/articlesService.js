import api from './api.js';
import { requester } from './requester.js';

export const all = () => {
    const url = api.allArticles;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const allCurrentCategory = (categoryId) => {
    const url = `${api.allArticlesCurrentCategory}/${categoryId}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const search = (query) => {
    const url = `${api.searchArticles}/${query}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const order = (orderCriteria) => {
    const url = `${api.orderArticles}/${orderCriteria}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const details = (id) => {
    const url = `${api.detailsArticle}/${id}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const like = (id) => {
    const url = `${api.articleLike}/${id}`;

    return requester(url, 'POST')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const dislike = (id) => {
    const url = `${api.articleDislike}/${id}`;

    return requester(url, 'POST')
        .then(res => res.json())
        .catch(err => console.error(err));
};
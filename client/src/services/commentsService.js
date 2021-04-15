import api from './api.js';
import { requester } from './requester.js';

export const getForCurrentArticle = (articleId) => {
    const url = `${api.commentsCurrentArticle}/${articleId}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};
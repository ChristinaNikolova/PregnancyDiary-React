import api from './api.js';
import { requester } from './requester.js';

export const getForCurrentArticle = (articleId) => {
    const url = `${api.commentsCurrentArticle}/${articleId}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const create = (content, articleId) => {
    const comment = {
        content,
        articleId
    };

    const url = `${api.createComment}`;

    return requester(url, 'POST', comment)
        .then(res => res.json())
        .catch(err => console.error(err));
};
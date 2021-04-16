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

export const allForAdmin = () => {
    const url = api.adminAllArticles;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
}

export const remove = (id) => {
    const url = `${api.removeArticle}/${id}`;

    return requester(url, 'Delete')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const create = (title, content, categoryName, picture) => {
    const article = {
        title,
        content,
        categoryName,
        picture
    };

    const url = `${api.adminCreateArticle}`;

    return requester(url, 'POST', article)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getArticleForUpdate = (id) => {
    const url = `${api.adminGetArticleForUpdate}/${id}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
}

export const update = (id, title, content, categoryName, picture) => {
    const article = {
        id,
        title,
        content,
        categoryName,
        picture
    };

    const url = `${api.adminUpdateArticle}`;

    return requester(url, 'PUT', article)
        .then(res => res.json())
        .catch(err => console.error(err));
};
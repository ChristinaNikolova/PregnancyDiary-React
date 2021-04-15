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

export const order = (orderCriteria) => {
    return fetch(`${api.orderArticles}/${orderCriteria}`)
        .then(res => res.json())
        .catch(err => console.error(err));
}

export const getDetails = (id) => {
    const url = `${api.detailsArticle}/${id}`;
    console.log(url);
    return fetch(url)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}
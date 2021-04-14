import api from './api.js';

export const all = () => {
    return fetch(api.allArticles)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const allCurrentCategory = (categoryId) => {
    console.log("in");
    console.log(`${api.allArticlesCurrentCategory}/${categoryId}`);
    return fetch(`${api.allArticlesCurrentCategory}/${categoryId}`)
        .then(res => res.json())
        .catch(err => console.error(err));
}

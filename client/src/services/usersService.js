import api from './api.js';
import { requester } from './requester.js';

export const getFavouriteArticles = () => {
    const url = `${api.userFavArticles}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};
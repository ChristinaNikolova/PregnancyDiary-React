import api from './api.js';
import { requester } from './requester.js';

export const create = (name, birthDate, birthTime, gender, weight, height, picture, diaryId) => {
    const baby = {
        name,
        birthDate,
        birthTime,
        gender,
        weight,
        height,
        picture,
        diaryId
    };

    const url = `${api.createBaby}`;

    return requester(url, 'POST', baby)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getDetails = (diaryId) => {
    const url = `${api.getBabyDetails}/${diaryId}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const remove = (id) => {
    const url = `${api.removeBaby}/${id}`;

    return requester(url, 'DELETE')
        .then(res => res.json())
        .catch(err => console.error(err));
}
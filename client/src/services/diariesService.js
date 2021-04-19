import api from './api.js';
import { requester } from './requester.js';

export const create = (positiveTest, dueDate, gender) => {
    const diary = {
        positiveTest,
        dueDate,
        gender
    };

    const url = `${api.createDiary}`;

    return requester(url, 'POST', diary)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const remove = (id) => {
    const url = `${api.removeDiary}/${id}`;

    return requester(url, 'DELETE')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getDiary = (id) => {
    const url = `${api.diaryDetails}/${id}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getDiaryForUpdate = (id) => {
    const url = `${api.update}/${id}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const update = (id, positiveTest, dueDate, gender) => {
    const diary = {
        id,
        positiveTest,
        dueDate,
        gender
    };

    const url = `${api.updateDiary}`;

    return requester(url, 'PUT', diary)
        .then(res => res.json())
        .catch(err => console.error(err));
};


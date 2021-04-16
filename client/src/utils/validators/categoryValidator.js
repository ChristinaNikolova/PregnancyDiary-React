import categoryConstants from '../constants/categoryConstants.js';

export const validName = (name) => {
    if (
        name.length >= categoryConstants.NAME_MIN_LEN &&
        name.length <= categoryConstants.NAME_MAX_LEN &&
        name !== ''
    ) {
        return '';
    }

    return (`Name should be between ${categoryConstants.NAME_MIN_LEN} and ${categoryConstants.NAME_MAX_LEN} characters long.`);
};

export const validPicture = (picture) => {
    if ((picture.startsWith('https://') || picture.startsWith('http://')) &&
        picture !== ''
    ) {
        return '';
    }

    return ('Idvalid URL.');
};
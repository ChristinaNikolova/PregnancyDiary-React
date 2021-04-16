import articleConstants from '../constants/articleConstants.js';

export const validSearchText = (content) => {
    if (
        content.length >= articleConstants.SEARCH_TEXT_MIN_LEN &&
        content !== ''
    ) {
        return '';
    }

    return (`Content should be at least ${articleConstants.SEARCH_TEXT_MIN_LEN} characters long.`);
};

export const validTitle = (title) => {
    if (
        title.length >= articleConstants.TITLE_MIN_LENGHT &&
        title.length <= articleConstants.TITLE_MAX_LENGHT &&
        title !== ''
    ) {
        return '';
    }

    return (`Title should be between ${articleConstants.TITLE_MIN_LENGHT} and ${articleConstants.TITLE_MAX_LENGHT} characters long.`);
};

export const validContent = (content) => {
    if (
        content.length >= articleConstants.CONTENT_MIN_LENGHT &&
        content.length <= articleConstants.CONTENT_MAX_LENGHT &&
        content !== ''
    ) {
        return '';
    }

    return (`Content should be between ${articleConstants.CONTENT_MIN_LENGHT} and ${articleConstants.CONTENT_MAX_LENGHT} characters long.`);
};

export const validPicture = (picture) => {
    if ((picture.startsWith('https://') || picture.startsWith('http://')) &&
        picture !== ''
    ) {
        return '';
    }

    return ('Idvalid URL.');
};


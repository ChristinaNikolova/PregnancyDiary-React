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
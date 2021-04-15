import commentConstants from '../constants/commentConstants.js';

export const validContent = (content) => {
    if (
        content.length >= commentConstants.CONTENT_MIN_LEN &&
        content.length <= commentConstants.CONTENT_MAX_LEN &&
        content !== ''
    ) {
        return '';
    }

    return (`Content should be between ${commentConstants.CONTENT_MIN_LEN} and ${commentConstants.CONTENT_MAX_LEN} characters long.`);
};
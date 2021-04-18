import memoryConstants from '../constants/memoryConstants.js';

export const validDate = (date) => {
    const todaysDate = new Date();
    const pickedDate = new Date(Date.parse(date.replace(/-/g, " ")));

    if (todaysDate >= pickedDate &&
        pickedDate !== ''
    ) {
        return '';
    }

    return (`Invalid date`);
};

export const validTitle = (title) => {
    if (
        title.length >= memoryConstants.TITLE_MIN_LEN &&
        title.length <= memoryConstants.TITLE_MAX_LEN &&
        title !== ''
    ) {
        return '';
    }

    return (`Title should be between ${memoryConstants.TITLE_MIN_LEN} and ${memoryConstants.TITLE_MAX_LEN} characters long.`);
};

export const validContent = (content) => {
    if (content.length <= memoryConstants.CONTENT_MAX_LEN) {
        return '';
    }

    return (`Content should be max ${memoryConstants.CONTENT_MAX_LEN} characters long.`);
};
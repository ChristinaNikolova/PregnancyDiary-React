import weekConstants from '../constants/weekConstrants.js';

export const validNumber = (number) => {
    if (
        number >= weekConstants.NUMBER_MIN &&
        number <= weekConstants.NUMBER_MAX &&
        number !== ''
    ) {
        return '';
    }

    return (`Number should be between ${weekConstants.NUMBER_MIN} and ${weekConstants.NUMBER_MAX}.`);
};

export const validMyWeight = (myWeight) => {
    if (myWeight !== '') {
        return '';
    }

    return (`Field is required.`);
};

export const validMyBellySize = (myBellySize) => {
    if (myBellySize !== '') {
        return '';
    }

    return (`Field is required.`);
};

export const validBabyWeight = (babyWeight) => {
    if (babyWeight !== '') {
        return '';
    }

    return (`Field is required.`);
};

export const validBabyHeight = (babyHeight) => {
    if (babyHeight !== '') {
        return '';
    }

    return (`Field is required.`);
};
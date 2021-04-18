import babyConstants from '../constants/babyConstants.js';

export const validName = (name) => {
    if (
        name.length >= babyConstants.NAME_MIN_LEN &&
        name.length <= babyConstants.NAME_MAX_LEN &&
        name !== ''
    ) {
        return '';
    }

    return (`Name should be between ${babyConstants.NAME_MIN_LEN} and ${babyConstants.NAME_MAX_LEN} characters long.`);
};

export const validbirthDate = (birthDate) => {
    const todaysDate = new Date();
    const pickedDate = new Date(Date.parse(birthDate.replace(/-/g, " ")));

    if (todaysDate >= pickedDate &&
        birthDate !== ''
    ) {
        return '';
    }

    return (`Invalid date`);
};

export const validBirthTime = (birthTime) => {
    if (birthTime !== '') {
        return '';
    }

    return ('Field is required.');
};

export const validHeight = (height) => {
    if (height !== '') {
        return '';
    }

    return ('Field is required.');
};

export const validWeight = (weight) => {
    if (weight !== '') {
        return '';
    }

    return ('Field is required.');
};
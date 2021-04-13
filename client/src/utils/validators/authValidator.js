import authConstants from '../constants/authConstants.js';

export const validEmail = (email) => {
    const emailRegex = new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");

    if (email !== '' &&
        emailRegex.test(email)
    ) {
        return '';
    }

    return ('Invalid email.');
};

export const validUsername = (username) => {
    if (
        username.length >= authConstants.USERNAME_MIN_LEN &&
        username !== ''
    ) {
        return '';
    }

    return (`Username should be at least ${authConstants.USERNAME_MIN_LEN}.`);
};

export const validPassword = (password) => {
    if (
        password.length >= authConstants.PASS_MIN_LEN &&
        password !== ''
    ) {
        return '';
    }

    return (`Password should be at least ${authConstants.PASS_MIN_LEN}.`);
};

export const validPasswordsMatch = (password, rePassword) => {
    if (
        password === rePassword
    ) {
        return '';
    }

    return ('Passwords should match.');
};
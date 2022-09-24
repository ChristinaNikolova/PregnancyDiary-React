import { useState, useContext } from 'react';
import toastr from 'toastr';

import * as validator from '../../../utils/validators/authValidator.js';
import * as authService from '../../../services/authService.js';
import { AuthContext } from '../../../contexts/AuthContext.js';

import Input from '../../shared/Input/Input.jsx';
import LoginRegisterPicture from '../../shared/LoginRegisterPicture/LoginRegisterPicture.jsx';

import './Register.css';

function Register({ history }) {
    const { userLogin } = useContext(AuthContext);
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRePassword, setErrorRePassword] = useState('');

    // useEffect(() => {
    //     if (authService.isAuthenticated()) {
    //         history.push('/');
    //         return;
    //     };
    // }, []);

    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const rePassword = e.target.repeatPassword.value;

        setErrorUsername(validator.validUsername(username));
        setErrorEmail(validator.validEmail(email));
        setErrorPassword(validator.validPassword(password));
        setErrorRePassword(validator.validPasswordsMatch(password, rePassword));

        if (validator.validUsername(username) === '' &&
            validator.validEmail(email) === '' &&
            validator.validPassword(password) === '' &&
            validator.validPasswordsMatch(password, rePassword) === '') {
            authService
                .register(username, email, password)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    };

                    userLogin(data);
                    history.push('/');
                    toastr.success(data['message'], 'Success');
                });
        };
    };

    return (
        <div className="register-wrapper">
            <h1 className="custom-font text-center">Register</h1>
            <hr />
            <div className="row register-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onRegisterSubmitHandler}>
                        <Input
                            type='text'
                            name='username'
                            label='Username'
                            error={errorUsername} />

                        <Input
                            type='email'
                            name='email'
                            label='Email'
                            error={errorEmail} />

                        <Input
                            type='password'
                            name='password'
                            label='Password'
                            error={errorPassword} />

                        <Input
                            type='password'
                            name='repeatPassword'
                            label='Repeat password'
                            error={errorRePassword} />

                        <div className="text-center">
                            <button className="btn" type="submit"> Register</button>
                        </div>
                    </form>
                </div>
            </div>
            <LoginRegisterPicture />
        </div>
    );
}

export default Register;
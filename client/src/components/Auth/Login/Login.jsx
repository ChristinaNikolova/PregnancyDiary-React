import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

import Input from '../../shared/Input/Input.jsx';
import LoginRegisterPicture from '../../shared/LoginRegisterPicture/LoginRegisterPicture.jsx';
import * as validator from '../../../utils/validators/authValidator.js';
import * as authService from '../../../services/authService.js';

import './Login.css';

function Login({ history, clickHandler }) {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    
    useEffect(() => {
        if (authService.isAuthenticated()) {
            history.push('/');
            return;
        };
    }, []);


    const onLoginSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorEmail(validator.validEmail(email));
        setErrorPassword(validator.validPassword(password));

        if (validator.validEmail(email) === '' &&
            validator.validPassword(password) === '') {
            authService
                .login(email, password)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    localStorage.setItem('token', data['token']);
                    localStorage.setItem('username', data['username']);
                    localStorage.setItem('isAdmin', data['isAdmin']);
                    clickHandler();
                    history.push('/');
                    toastr.success(data['message'], 'Success');
                });
        }
    }

    return (
        <div className="login-wrapper">
            <h1 className="custom-font text-center">Sign In</h1>
            <hr />
            <div className="row login-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onLoginSubmitHandler}>
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

                        <div className="text-center">
                            <button className="btn" type="submit">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
            <LoginRegisterPicture />
        </div>
    );
}

export default withRouter(Login);
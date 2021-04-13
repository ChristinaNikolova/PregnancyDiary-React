import { useState } from 'react';
import toastr from 'toastr';

import Input from '../../shared/Input/Input.jsx';
import * as validator from '../../../utils/validators/authValidator.js';
import * as authService from '../../../services/authService.js';

function Login({ history }) {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const onLoginSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorEmail(validator.validEmail(email));
        setErrorPassword(validator.validPassword(password));

        if (validator.validEmail(email) === '' && validator.validPassword(password) === '') {
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
                    history.push('/');
                    toastr.success(data['message'], 'Success');
                })
        }
    }

    return (
        <div className="login-wrapper">
            <div className="container">
                <h1>Sign In</h1>
                <div className="row">
                    <div className="col-lg-10">
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

                            <button className="btn btn-dark" type="submit">Sign In</button>
                        </form>
                    </div>
                </div >
            </div >
        </div >
    );
}

export default Login;
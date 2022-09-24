import { useContext, useState } from 'react';
import toastr from 'toastr';

import * as validator from '../../../utils/validators/authValidator.js';
import * as authService from '../../../services/authService.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import Input from '../../shared/Input/Input.jsx';
import LoginRegisterPicture from '../../shared/LoginRegisterPicture/LoginRegisterPicture.jsx';

import './Login.css';

function Login({ history }) {
    const { userLogin } = useContext(AuthContext);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

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

                    userLogin(data);
                    history.push('/');
                    toastr.success(data['message'], 'Success');
                });
        };
    };

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

export default Login;
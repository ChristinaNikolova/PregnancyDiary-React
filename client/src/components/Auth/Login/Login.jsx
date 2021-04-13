import Input from "../../shared/Input/Input";

function Login() {

    const onLoginSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email);
        console.log(password);
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
                                label='Email'/>

                            <Input
                                type='password'
                                name='password'
                                label='Password'/>

                            <button className="btn btn-dark" type="submit">Sign In</button>
                        </form>
                    </div>
                </div >
            </div >
        </div >
    );
}

export default Login;
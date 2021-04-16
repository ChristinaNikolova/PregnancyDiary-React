import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as authService from '../../services/authService.js';

import './Home.css';

function Home({ isLoggedIn }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(authService.getUsername());
    }, []);

    return (
        <div className="home-wrapper">
            {isLoggedIn
                ? <h1 className="display-3 custom-font text-center">Welcome, {username}!</h1>
                : <h1 className="display-3 custom-font text-center">Welcome to Pregnancy Diary!</h1>}
            {!isLoggedIn
                ? <div>
                    <p className="text-center">
                        <Link to="/register" className="bold-home-link"> Register </Link> or
                            <Link to="/login" className="bold-home-link"> Login </Link>now to create your own pregnancy diary!
                        </p>
                    <hr className="my-4" />
                </div>
                : null}
            <p className="custom-font text-center">
                A Baby Fills a Place in Your Heart That You Never Knew Was Empty!
                </p>
            <div className="text-center">
                <img className="image-home m-3" src="./719a40e8ec1aef158830db898a9e2e90.jpg" alt="home-pic"></img>
            </div>
            {isLoggedIn
                    ? <p className="lead-home">
                        <Link to="/recipes" className="btn btn-primary btn-lg mt-4 mr-2" role="button">See our recipes</Link>
                        <Link to='/recipes/create' className="btn btn-primary btn-lg mt-4" role="button">Create new recipe</Link>
                    </p>
                    : null}

        </div>
    );
}

export default Home;
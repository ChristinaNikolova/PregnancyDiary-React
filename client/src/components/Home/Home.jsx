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
                        <Link to="/register" className="color-link"> Register </Link> or
                        <Link to="/login" className="color-link"> Login </Link>now to create your own pregnancy diary!
                        </p>
                    <hr />
                </div>
                : null}
            <p className="custom-font text-center">
                A Baby Fills a Place in Your Heart That You Never Knew Was Empty!
                </p>
            <div className="text-center">
                <img className="image-home m-3" src="./719a40e8ec1aef158830db898a9e2e90.jpg" alt="home-pic"></img>
            </div>
            {isLoggedIn
                ? <div>
                    <p className="lead-home text-center">
                        <Link to='/recipes'><button className="btn btn-lg mt-4 mr-2" role="button">See our diaries</button></Link>
                        <Link to='/recipes/create'><button className="btn btn-lg mt-4" role="button">Create new diary</button></Link>
                    </p>
                    < div className="fill pt-1 pb-1"></div>
                </div>
                : null}

        </div>
    );
}

export default Home;
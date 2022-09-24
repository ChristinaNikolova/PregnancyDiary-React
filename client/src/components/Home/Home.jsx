import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext.js';

import './Home.css';

function Home() {
    const { isAuthenticated, username } = useContext(AuthContext);

    return (
        <div className="home-wrapper">
            {isAuthenticated
                ? <h1 className="display-3 custom-font text-center">Welcome, {username}!</h1>
                : <h1 className="display-3 custom-font text-center">Welcome to Pregnancy Diary!</h1>}
            {!isAuthenticated &&
                <div>
                    <p className="text-center">
                        <Link to="/register" className="color-link"> Register </Link> or
                        <Link to="/login" className="color-link"> Login </Link>now to create your own pregnancy diary!
                    </p>
                    <hr />
                </div>
            }
            <p className="custom-font text-center">
                A Baby Fills a Place in Your Heart That You Never Knew Was Empty!
            </p>
            <div className="text-center">
                <img className="image-home m-3" src="./719a40e8ec1aef158830db898a9e2e90.jpg" alt="home-pic"></img>
            </div>
            {isAuthenticated &&
                <div>
                    <p className="lead-home text-center">
                        <Link to='/user/diaries'><button className="btn btn-lg mt-4 mr-2">See your diaries</button></Link>
                        <Link to='/diary/create'><button className="btn btn-lg mt-4">Create new diary</button></Link>
                    </p>
                    < div className="fill pt-1 pb-1"></div>
                </div>
            }

        </div>
    );
}

export default Home;
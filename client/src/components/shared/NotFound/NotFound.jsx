import { Link } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
    return (
        <div className="not-found-wrapper text-center">
            <img src="./koala-and-mama-malta-babywearing-404-page-not-found.png" alt="not-found"></img>
            <div className="msg custom-font">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
                <p>Let's go <Link to="/" className="home-link">home</Link> and try from there.</p>
            </div>
        </div>
    );
}

export default NotFound;
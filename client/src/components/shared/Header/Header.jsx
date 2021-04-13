import { Link, withRouter } from 'react-router-dom';
import toastr from 'toastr';

import * as authService from '../../../services/authService.js';

import './Header.css';

function Header({ isAdmin, isLoggedIn, clickHandler, history }) {
    const logout = () => {
        authService.logout();
        toastr.success('Successful logout', 'Success');
        history.push('/');
        clickHandler();
    }

    return (
        <div className="header-wrapper">
            <nav className="navbar navbar-expand-lg">
                <Link to="/home" className="navbar-brand">Pregnancy-Diary</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item active"><Link to="/" className="nav-link">Home </Link>
                        </li>
                        {!isLoggedIn && <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>}
                        {!isLoggedIn && <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>}
                        {isLoggedIn && <li className="nav-item"><button className="btn btn-danger ml-1" type="button" onClick={logout}>Logout</button></li>}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(Header);
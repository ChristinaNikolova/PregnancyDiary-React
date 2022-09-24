import { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import toastr from 'toastr';

import { AuthContext } from '../../../contexts/AuthContext.js';
import * as authService from '../../../services/authService.js';

import './Header.css';

function Header({ history }) {
    const { isAuthenticated, isAdmin, userLogout } = useContext(AuthContext);

    const logout = () => {
        authService.logout();
        userLogout();
        toastr.success('Successful logout', 'Success');
        history.push('/');
    };

    return (
        <div className="header-wrapper">
            <nav className="navbar navbar-expand-lg">
                <Link to="/home" className="navbar-brand">Pregnancy-Diary</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item active"><Link to="/" className="nav-link">Home</Link>
                        </li>
                        {!isAuthenticated && <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>}
                        {!isAuthenticated && <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>}
                        {isAuthenticated && <li className="nav-item"><Link to="/user/diaries" className="nav-link">My Diaries</Link></li>}
                        <li className="nav-item"><Link to="/articles" className="nav-link">Blog</Link></li>
                        {isAuthenticated && <li className="nav-item"><Link to="/user/favourite-articles" className="nav-link">My Favourite Articles</Link></li>}
                        {isAuthenticated && isAdmin && <li className="nav-item"><Link to="/admin/dashboard" className="nav-link">Administration</Link></li>}
                        {isAuthenticated && <li className="nav-item"><Link to='/diary/create'><button className="btn btn-create-diary ml-1" type="button">Create new diary</button></Link></li>}
                        {isAuthenticated && <li className="nav-item"><button className="btn btn-danger ml-1" type="button" onClick={logout}>Logout</button></li>}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(Header);
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as authService from '../../../services/authService.js'

import './Dashboard.css';

function Dashboard({ history }) {
    useEffect(() => {
        if (!authService.isAdmin()) {
            history.push('/');
            return;
        }
    }, []);

    return (
        <div className="admin-home-wrapper">
            <h1 className="text-center custom-font p-1">Welcome to Administration</h1>
            <hr className="hr-admin-dashboard" />
            <div>
                <ul className="custom-font-li">
                    <li className="m-1">
                        Categories
                <div className="mt-2 mb-2">
                            <Link to="/admin/categories"><button className="btn mr-2 all-admin-area">All Categories</button></Link>
                            <Link to="/admin/categories/create"><button className="btn mr-2 create-admin-area">Create Category</button></Link>
                        </div>
                    </li>
                    <li className="m-1">
                        Articles
                <div className="mt-2 mb-2">
                            <Link to="/admin/articles"><button className="btn mr-2 all-admin-area">All Articles</button></Link>
                            <Link to="/admin/articles/create"><button className="btn mr-2 create-admin-area">Create Article</button></Link>
                        </div>
                    </li >
                </ul >
            </div >
            < div className="fill pt-1 pb-1" ></div >
        </div >
    );
}

export default Dashboard;
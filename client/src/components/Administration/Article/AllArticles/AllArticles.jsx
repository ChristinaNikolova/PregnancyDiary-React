import { useState, useEffect } from 'react';
import toastr from 'toastr';

import * as articlesService from '../../../../services/articlesService.js';
import * as authService from '../../../../services/authService.js';

import ArticleSingleRow from '../ArticleSingleRow/ArticleSingleRow.jsx';
import './AllArticles.css';

function AllArticles({ history }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (!authService.isAdmin()) {
            history.push('/');
            return;
        };

        articlesService
            .allForAdmin()
            .then(res => setArticles(res))
            .catch(err => console.error(err));
    }, []);

    const removeClickHandler = (articleId) => {
        articlesService
            .remove(articleId)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                }

                setArticles((state) => state.filter((a) => a.id !== articleId));
                toastr.success(data['message'], 'Success');
            });
    };

    return (
        <div className="all-articles-wrapper">
            <h1 className="text-center custom-font p-1">Articles</h1>
            <hr />
            <div className="container">
                <table className="table table-striped table-bordered table-hover table-background m-2">
                    <thead className="text-center">
                        <tr>
                            <th>Title</th>
                            <th>Picture</th>
                            <th>Category</th>
                            <th>Likes</th>
                            <th>Comments</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles?.map(a => <ArticleSingleRow
                            key={a.id}
                            id={a.id}
                            title={a.title}
                            picture={a.picture}
                            categoryId={a.categoryId}
                            categoryName={a.categoryName}
                            likesCount={a.likesCount}
                            commentsCount={a.commentsCount}
                            onRemove={removeClickHandler} />)}
                    </tbody>
                </table>
            </div>
            <div className="fill pb-1 pt-1"></div>
        </div >
    );
}

export default AllArticles;
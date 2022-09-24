import { useState, useEffect } from 'react';
import toastr from 'toastr';

import * as artilcesService from '../../../services/articlesService.js';
import * as usersService from '../../../services/usersService.js';

import FavouriteArticlesRow from '../FavouriteArticlesRow/FavouriteArticlesRow.jsx';
import './FavouriteArticles.css';

function FavouriteArticles() {
    const [favArticles, setFavArticles] = useState([]);

    useEffect(() => {
        loadFavArticles();
    }, []);

    const removeFavClickHandler = (articleId) => {
        artilcesService
            .dislike(articleId)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                };

                loadFavArticles();
                toastr.success(data['message'], 'Success');
            });
    };

    const loadFavArticles = () => {
        usersService
            .getFavouriteArticles()
            .then(res => setFavArticles(res))
            .catch(err => console.error(err));
    }

    return (
        <div className="favourite-articles-wrapper">
            <h1 className="text-center custom-font p-1">My Favourite Articles</h1>
            <hr />
            <div className="container">
                <table className="table table-bordered table-hover table-background">
                    <thead className="text-center">
                        <tr>
                            <th>Title</th>
                            <th>Picture</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {favArticles
                            .map(a => <FavouriteArticlesRow
                                key={a.articleId}
                                articleId={a.articleId}
                                articleTitle={a.articleTitle}
                                articlePicture={a.articlePicture}
                                articleCategoryId={a.articleCategoryId}
                                articleCategoryName={a.articleCategoryName}
                                clickHandler={removeFavClickHandler} />)
                        }
                    </tbody>
                </table>
            </div>
            <div className="fill pt-1 pb-1"></div>
        </div >
    );
}

export default FavouriteArticles
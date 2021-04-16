import { useState, useEffect } from 'react';

import * as usersService from '../../../services/usersService.js';
import FavouriteArticlesRow from '../FavouriteArticlesRow/FavouriteArticlesRow.jsx';

import './FavouriteArticles.css';

function FavouriteArticles() {
    const [favArticles, setFavArticles] = useState([]);
    const [hasToReload, setHasToReload] = useState(false);

    useEffect(() => {
        usersService
            .getFavouriteArticles()
            .then(res => setFavArticles(res))
            .then(setHasToReload(false))
            .catch(err => console.error(err));
    }, [hasToReload]);

    const reload = () => {
        setTimeout(() => {
            setHasToReload(true)
        }, 100);
    }

    return (
        <div className="favourite-articles-wrapper">
            <h1 className="text-center custom-font p-1">My Favourite Articles</h1>
            <hr />
            <table className="table table-bordered table-hover table-background">
                <thead>
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
                            clickHandler={reload} />)}
                </tbody>
            </table>
            <div className="fill pt-1 pb-1"></div>
        </div >
    );
}

export default FavouriteArticles
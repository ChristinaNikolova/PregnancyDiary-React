import { Link } from 'react-router-dom';
import toastr from 'toastr';

import * as artilcesService from '../../../services/articlesService.js';

import './FavouriteArticlesRow.css';

function FavouriteArticlesRow({ articleId, articleTitle, articlePicture, articleCategoryName, articleCategoryId, clickHandler }) {
    const removeFromFav = () => {
        artilcesService
            .dislike(articleId)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                };
                toastr.success(data['message'], 'Success');
                clickHandler();
            });
    };

    return (
        <tr className="text-center">
            <td className="color-link">
                <Link to={`/articles/current-article/${articleId}`}><h6>{articleTitle}</h6></Link>
            </td>
            <td>
                <img className="pic-fav-articles" src={articlePicture} alt="article-pic" />
            </td>
            <td className="color-link">
                <Link to={`/articles/by-category/${articleCategoryId}`}>{articleCategoryName}</Link>
            </td>
            <td><button className="btn btn-danger" onClick={removeFromFav}>Remove</button></td>
        </tr >
    );
}

export default FavouriteArticlesRow;
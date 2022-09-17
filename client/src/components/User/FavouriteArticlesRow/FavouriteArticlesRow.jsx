import { Link } from 'react-router-dom';

import './FavouriteArticlesRow.css';

function FavouriteArticlesRow({ articleId, articleTitle, articlePicture, articleCategoryName, articleCategoryId, clickHandler }) {
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
            <td><button className="btn btn-danger" onClick={() => clickHandler(articleId)}>Remove</button></td>
        </tr >
    );
}

export default FavouriteArticlesRow;
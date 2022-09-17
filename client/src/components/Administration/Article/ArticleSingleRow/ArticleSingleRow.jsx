import { Link } from 'react-router-dom';

import './ArticleSingleRow.css';

function ArticleSingleRow({ id, title, picture, categoryId, categoryName, likesCount, commentsCount, clickHandler }) {
    return (
        <tr className="text-center">
            <td className="color-link"><Link to={`/articles/current-article/${id}`}>{title}</Link></td>
            <td><img className="img-article-admin" src={picture} alt="article-pic"></img></td>
            <td className="color-link"><Link to={`/articles/by-category/${categoryId}`}>{categoryName}</Link></td>
            <td className="aricles-likes-count">{likesCount}</td>
            <td className="aricles-comments-count">{commentsCount}</td>
            <td><Link to={`/admin/articles/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={() => clickHandler(id)} >Delete</button></td >
        </tr >
    );
}

export default ArticleSingleRow;
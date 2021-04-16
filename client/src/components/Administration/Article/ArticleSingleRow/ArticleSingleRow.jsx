import { Link } from 'react-router-dom';
import toastr from 'toastr';

import * as articlesService from '../../../../services/articlesService.js';

import './ArticleSingleRow.css';

function ArticleSingleRow({ id, title, picture, categoryId, categoryName, likesCount, commentsCount, clickHandler }) {
    const remove = () => {
        articlesService
            .remove(id)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                }
                toastr.success(data['message'], 'Success');
                clickHandler();
            })
    }

    return (
        <tr className="text-center">
            <td className="color-link"><Link to={`/articles/current-article/${id}`}>{title}</Link></td>
            <td><img className="img-article-admin" src={picture} alt="article-pic"></img></td>
            <td className="color-link"><Link to={`/articles/by-category/${categoryId}`}>{categoryName}</Link></td>
            <td>{likesCount}</td>
            <td>{commentsCount}</td>
            <td><Link to={`/admin/articles/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={remove} >Delete</button></td >
        </tr >
    );
}

export default ArticleSingleRow;
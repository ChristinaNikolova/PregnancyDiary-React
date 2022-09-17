import { Link } from 'react-router-dom';

import './CategorySingleRow.css';

function CategorySingleRow({ id, name, articlesCount, picture, clickHandler }) {
    return (
        <tr className="text-center">
            <td className="color-link"><Link to={`/articles/by-category/${id}`}>{name}</Link></td>
            <td className="articles-count">{articlesCount}</td>
            <td><img className="img-category-admin" src={picture} alt="category-pic"></img></td>
            <td><Link to={`/admin/categories/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={() => clickHandler(id)} >Delete</button></td >
        </tr >
    );
}

export default CategorySingleRow;
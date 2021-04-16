import { Link } from 'react-router-dom';
import toastr from 'toastr';

import * as categoriesService from '../../../../services/categoriesService.js';

import './CategorySingleRow.css';

function CategorySingleRow({ id, name, articlesCount, picture, clickHandler }) {
    const remove = () => {
        categoriesService
            .remove(id)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                }
                toastr.success(data['message'], 'Success');
                clickHandler();
            });
    }

    return (
        <tr className="text-center">
            <td className="color-link"><Link to={`/articles/by-category/${id}`}>{name}</Link></td>
            <td>{articlesCount}</td>
            <td><img className="img-category-admin" src={picture} alt="category-pic"></img></td>
            <td><Link to={`/admin/categories/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={remove} >Delete</button></td >
        </tr >
    );
}

export default CategorySingleRow;
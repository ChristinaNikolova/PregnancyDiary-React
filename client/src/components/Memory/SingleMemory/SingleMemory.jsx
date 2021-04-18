import { Link } from 'react-router-dom';
import toastr from 'toastr';

import * as memoriesService from '../../../services/memoriesService.js';

import './SingleMemory.css';

function SingleMemory({ id, date, title, content, clickHandler }) {
    const remove = () => {
        memoriesService
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
        <tr className="text-center row-single-memory">
            <td>{date}</td>
            <td>{title}</td>
            <td>{content}</td>
            <td><Link to={`/week/memory/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={remove}>Remove</button></td>
        </tr >
    );
}

export default SingleMemory;
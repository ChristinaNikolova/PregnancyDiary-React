import { Link } from 'react-router-dom';
import toastr from 'toastr';

import * as weeksService from '../../../services/weeksService.js';

import './SingleWeek.css';

function SingleWeek({ id, number, mood, moments, clickHandler }) {
    const remove = () => {
        weeksService
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
        <tr className="text-center row-single-week">
            <td>{number}</td>
            <td>{mood}</td>
            <td>{moments}</td>
            <td><Link to={`/diary/week/see/${id}`}><button className="btn btn-details">See Week</button></Link></td>
            <td><Link to={`/diary/week/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={remove}>Remove</button></td>
        </tr>
    );
}

export default SingleWeek;
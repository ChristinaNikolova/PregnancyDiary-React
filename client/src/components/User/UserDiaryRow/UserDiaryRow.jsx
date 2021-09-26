import { Link } from 'react-router-dom';
import toastr from 'toastr';

import * as diariesService from '../../../services/diariesService.js';

import './UserDiaryRow.css';

function UserDiaryRow({ id, positiveTest, dueDate, gender, weeks, clickHandler }) {
    const remove = () => {
        diariesService
            .remove(id)
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
            <td className="td-positive-test">{positiveTest}</td>
            <td className="td-due-test">{dueDate}</td>
            {gender !== 'DontKnow'
                ? <td className="td-gender">{gender}</td>
                : <td className="td-unknown-gender">I don't know yet</td>}
            <td className="td-weeks">{weeks}</td>
            <td><Link to={`/diary/see/${id}`}><button className="btn btn-details">See Diary</button></Link></td>
            <td><Link to={`/diary/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={remove}>Remove</button></td>
        </tr >
    );
}

export default UserDiaryRow;